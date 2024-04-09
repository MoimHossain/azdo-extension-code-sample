import * as SDK from "azure-devops-extension-sdk";
import OrgService from "./orgService";
import { CustomClient } from "./customClient";
import { getClient, CommonServiceIds, IProjectPageService } from "azure-devops-extension-api";
import { CoreRestClient } from 'azure-devops-extension-api/Core';
import { GitRestClient } from 'azure-devops-extension-api/Git';
import { GitRepositoryCreateOptions } from "azure-devops-extension-api/Git";
import * as Core from "azure-devops-extension-api/Core/Core";

import ConfigService from "../../../shared/services/configService";

export default class CopilotService {

    private delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    private runningOnLocalHost() {
        return document.location.hostname === 'localhost';
    }

    public async submitFeedback(payload: any) {
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not creating branch");
            await this.delay(1000);           
            return {
                id: 'yy',
                name: 'xx'
            };
        }

        var globalConfig = await ConfigService.getGlobalExtensionConfig();
        var BACKENDHOST = globalConfig.copilotConfig.backendUri;
        var user = this.getCurrentUser();
        var hostInfo = SDK.getHost();
        var organizationName = hostInfo.name;
        const token = await SDK.getAccessToken();
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        var userContextInfo = {
            userName: user.displayName,
            email: user.name,
            projects: project ? project.name : '',
            licenses: "Basic",
            currentProject: project ? project.name : '',
            org: organizationName
        };
        console.log(userContextInfo);
        var response = await fetch(`${BACKENDHOST}/dialogs/feedback`, {
            method: 'POST',
            headers: {
                'X-MS-CLIENT-PRINCIPAL-CONTEXT': JSON.stringify(userContextInfo),
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        var result = await response.json();        
        return result;        
    }

    public async getRepository(repoName: string) {
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not creating branch");
            return {
                id: 'yy',
                name: 'xx'
            };
        }

        try {            
            let projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
            let project = await projectService.getProject();
            let gitClient = getClient(GitRestClient);
            if(project != null) {
                var repositories = await gitClient.getRepositories(project.id);
                for(var i=0; i<repositories.length; i++) {
                    if(repositories[i].name.toLocaleLowerCase() === repoName.toLocaleLowerCase()) {
                        return repositories[i];
                    }
                }
            }
        }
        catch (error) { console.log(error); }
        console.log(`Failed to find a repo with the mached name ${repoName}`);
        return {
            id: 'NOTFOUND',
            name: 'NOTFOUND'
        };
    }

    public async createPullRequest(        
        repoId: string,
        sourceBranch: string,
        targetBranch: string,
        commitMessage: string,
        fileName: string,
        content: string,
        prTitle: string,
        prDescription: string) {

        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not creating branch");
            return {
                title: 'xx'
            };
        }

        try {
            let customClient = getClient(CustomClient);
            let projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
            let project = await projectService.getProject();            
            if(project != null) {                
                var push = await customClient.createPullRequest(
                    project.id, 
                    repoId, 
                    sourceBranch, 
                    targetBranch, 
                    commitMessage, 
                    fileName, 
                    content, 
                    prTitle, 
                    prDescription);
                console.log('PR created', push);
                return push;
            }
        }
        catch (error) { console.log(error); }
        return {
            title: 'NOTFOUND'
        };
    }

    public async createProject(projectName: string) {
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not creating projectName");
            return {
                name: projectName
            };
        }

        try {
            let coreClient = getClient(CoreRestClient);
            
            var payload = { 
                name: projectName, 
                description: 'Created by Copilot'
            };
            let operation = await coreClient.queueCreateProject((payload as Core.TeamProject));
            console.log(operation);
            return payload;
        }
        catch (error) { console.log(error); }        
    }

    public async createRepository(repositoryName:string) {
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not creating repository");
            return {
                name: repositoryName
            };
        }
        
        try {
            let projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
            let project = await projectService.getProject();
            let gitClient = getClient(GitRestClient);
            if(project != null) {
                var projectId = (project != null ?  project.id : '') ;
                var payload = { 
                    name: repositoryName,                     
                    project: {
                        id: projectId,
                        name: project.name
                    }
                };
                let repository = await gitClient.createRepository((payload as GitRepositoryCreateOptions), projectId );
                console.log(repository);
                return repository;
            }
        }
        catch (error) { console.log(error); }
    }
    public async createTeam(teamName:string) {
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not creating team");
            return {
                name: teamName
            };
        }

        try {
            let projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
            let project = await projectService.getProject();
            let coreClient = getClient(CoreRestClient);
            if(project != null) {
                var projectId = (project != null ?  project.id : '') ;
                var payload = { 
                    name: teamName, 
                    description: 'Created by Copilot',
                    projectId: projectId
                };
                var x = (payload as Core.WebApiTeam)
                let team = await coreClient.createTeam(x, projectId );
                console.log(team);
                return team;
            }
        }
        catch (error) { console.log(error); }
    }

    //openAIModelName
    private async getBackendUri() {
        let configObject = await new OrgService().getExtensionConfig();
        console.log(configObject);
        if (configObject) {
            return configObject.copilotBackendUri;
        }
        return null;
    }


    public async initializeSdk() {
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not initializing SDK");
            return;
        }

        try {
            await SDK.init();
        }
        catch (error) { console.log(error); }
    }


    public getCurrentUser() {
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, returning fake user");
            return this.fakeUser;
        }

        return SDK.getUser();
    }

    private repairCitations(text: string, citationUrls: any[]) {
        citationUrls.forEach(citation => {
            var citationId = citation.id;
            var uri = citation.uri;
            text = text.replace(citationId, `[${citationId}](${uri})`);
        });
        text = text.replace("KB ID", "").replace("KBID", "");
        return text;
    }

    /*
    private repairLink(text: string) {        
        var matches = text.match(/<KnowledgeBase kbid="(\d+)">/g);
        if (matches) {
            matches.forEach(match => {
                var kbid = match.replace('<KnowledgeBase kbid="', '').replace('">', '');
                var uri = `https://dev.azure.com/moim/_apis/Contribution/HierarchyQuery/project/${kbid}?api-version=5.0-preview.1`;
                var title = 'KB ' + kbid;
                text = text.replace(match, `<a href="${uri}" target="_blank">${title}</a>`);
            });
        }
        return text;
    }*/
   
    public async listFeedbackAsync() {           
        if (this.runningOnLocalHost()) {
            console.log("Running on localhost, not initializing SDK");
            return [];
        }

        var globalConfig = await ConfigService.getGlobalExtensionConfig();
        var BACKENDHOST = globalConfig.copilotConfig.backendUri;
        var user = this.getCurrentUser();
        var hostInfo = SDK.getHost();
        var organizationName = hostInfo.name;
        const token = await SDK.getAccessToken();
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        var userContextInfo = {
            userName: user.displayName,
            email: user.name,
            projects: project ? project.name : '',
            licenses: "Basic",
            currentProject: project ? project.name : '',
            org: organizationName
        };
        console.log(userContextInfo);
        var response = await fetch(`${BACKENDHOST}/dialogs/feedback`, {
            method: 'GET',
            headers: {
                'X-MS-CLIENT-PRINCIPAL-CONTEXT': JSON.stringify(userContextInfo),
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        var result = await response.json();        
        return result;
    }

    public async getCopilotResponse(conversationId: string | null, prompt: string) {
        if (this.runningOnLocalHost()) {
            await this.delay(10);

            // var userContextInfo = {
            //     userName: "moimhossain",
            //     email: "moimhossain@abc.com",
            //     projects: "projectx",
            //     licenses: "Basic",
            //     currentProject: "projectx",
            //     org: "moim"
            // };
            // console.log(userContextInfo);
            // var response = await fetch(`https://confluence-copilot.wittyfield-afb7ce64.westeurope.azurecontainerapps.io/dialogs`, {
            //     method: 'POST',
            //     headers: {
            //         'X-MS-CLIENT-PRINCIPAL-CONTEXT': JSON.stringify(userContextInfo),
            //         'Authorization': `Bearer gagagag`,
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: conversationId ? JSON.stringify({ conversationId: conversationId, text: prompt }) : JSON.stringify({ text: prompt })
            // });
            // var result = await response.json();
            // console.log(result);
            // result.aiResponseText = this.repairCitations(result.aiResponseText, result.citationUrls);
            // return result;

            return {
                citationUrls: [
                    "https://confluence.dev.rabobank.nl/display/vsts/Nobody+can+delete+builds",
                    "https://confluence.dev.rabobank.nl/display/vsts/Nobody+can+delete+releases",
                    "https://confluence.dev.rabobank.nl/display/vsts/Azure+DevOps+-+delete+project"
                ],
                conversationId: "16be207f-23c1-4789-bb5f-ba237a2c60c9",
                aiResponseId: "25ff7f9c4ced4fa3abc6d8f19df04baf",
                aiResponseText: "Sure, Moim! Here's an example YAML pipeline that builds a .NET application:\n" +
                "```yaml\n" +
                "trigger:\n" +
                "- main\n" +
                
                "pool:\n" +
                "  vmImage: 'windows-latest'\n" +
                
                "variables:\n" +
                "  solution: '**/*.sln'\n" +
                "  buildPlatform: 'Any CPU'\n" +
                "  buildConfiguration: 'Release'\n" +
                
                "steps:\n" +
                "- task: NuGetToolInstaller@1\n" +
                
                "- task: NuGetCommand@2\n" +
                "  inputs:\n" +
                "    restoreSolution: '$(solution)'\n" +
                
                "- task: VSBuild@1\n" +
                "  inputs:\n" +
                "     solution: '$(solution)'\n" +
                "    platform: '$(buildPlatform)'\n" +
                "    configuration: '$(buildConfiguration)'\n" +
                "```\n " +
                
                "In this pipeline, we're using the `NuGetToolInstaller` task to install NuGet on the agent, the `NuGetCommand` task to restore packages, and the `VSBuild` task to build the solution. You may need to adjust the `variables` section to point to your specific solution file and build settings.\n" +
                
                "Once you have added this YAML file to your repository and pushed the changes, a build should be triggered and your application will be built. You can view the build output and any errors by clicking on the build in the Azure Pipelines UI." + 
                "<p>This pipeline does the following:</p>\n" +
                "<ol>\n" +
                "<li>Triggers a build of the pipeline when there is a commit or change in the main branch.</li>\n" +
                "<li>Specifies a Windows agent to build on.</li>\n" +
                "<li>Sets up variables to define the solution, build platform, and build configuration.</li>\n" +
                "<li>Uses the <code>NuGetToolInstaller</code> task to install NuGet dependencies on the agent.</li>\n" +
                "<li>Uses the <code>NuGetCommand</code> task to restore NuGet packages for your project.</li>\n" +
                "<li>Uses the <code>VSBuild</code> task to build your .NET application using the specified solution, platform, and configuration.</li>\n" +
                "</ol>\n" +
                "<p>All you need to do is change <code>YourSolution.sln</code> to the name of your actual solution file. You can also adjust the <code>buildPlatform</code> and <code>buildConfiguration</code> variables as needed.</p>\n" +
                "<p>Let me know if you have any other questions!</p>"
            };
        }



        var globalConfig = await ConfigService.getGlobalExtensionConfig();

        var BACKENDHOST = globalConfig.copilotConfig.backendUri;
        var user = this.getCurrentUser();
        var hostInfo = SDK.getHost();
        var organizationName = hostInfo.name;
        const token = await SDK.getAccessToken();
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        var userContextInfo = {
            userName: user.displayName,
            email: user.name,
            projects: project ? project.name : '',
            licenses: "Basic",
            currentProject: project ? project.name : '',
            org: organizationName
        };
        console.log(userContextInfo);
        var response = await fetch(`${BACKENDHOST}/dialogs`, {
            method: 'POST',
            headers: {
                'X-MS-CLIENT-PRINCIPAL-CONTEXT': JSON.stringify(userContextInfo),
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: conversationId ? JSON.stringify({ conversationId: conversationId, text: prompt }) : JSON.stringify({ text: prompt })
        });
        var result = await response.json();        
        result.aiResponseText = this.repairCitations(result.aiResponseText, result.citationUrls);
        return result;
    }

    private fakeUser = {
        descriptor: "aad.ZTBmZjNjMjYtM2ViZC03YjRmLWJmM2YtNjY1N2U3ODdiNDYz",
        displayName: "Moim Hossain",
        id: "8404cfbd-3b57-406c-8a02-5cf2ee1bbc2f",
        imageUrl: "https://dev.azure.com/moim/_apis/GraphProfile/MemberAvatars/aad.ZTBmZjNjMjYtM2ViZC03YjRmLWJmM2YtNjY1N2U3ODdiNDYz",
        name: "Moim_Hossain@XYZ.com"
    }
}