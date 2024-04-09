
import * as SDK from "azure-devops-extension-sdk";
import { getClient } from "azure-devops-extension-api";
import { RestClientBase } from "azure-devops-extension-api/Common/RestClientBase";
import { IVssRestClientOptions } from "azure-devops-extension-api/Common/Context";
import { IIdentity } from "azure-devops-ui/IdentityPicker";
import * as Graph from "azure-devops-extension-api/Graph/Graph";
import Backend from "./backend";
import DummyData from "./localDevelopment";


export interface AzDoTranslatedIdentityDescriptor {
    id: string;
    descriptor: string;
    subjectDescriptor: string;
    providerDisplayName: string;
}

class IdentityV2Client extends RestClientBase {
    public static readonly RESOURCE_AREA_ID = "bb1e7ec9-e901-4b68-999a-de7012b920f8";
    private static readonly CommonFields = ["DisplayName", "IsMru", "ScopeName", "SamAccountName", "Active", "SubjectDescriptor", "Department", "JobTitle", "Mail", "MailNickname", "PhysicalDeliveryOfficeName", "SignInAddress", "Surname", "Guest", "TelephoneNumber", "Manager", "Description"];

    constructor(options: IVssRestClientOptions) { super(options); }

    private delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    private runningOnLocalHost() {
        return document.location.hostname === 'localhost';
    }

    private async getAccessToken(): Promise<string> {
        return await Backend.getAccessToken();
    }

    private async getBackendUri(): Promise<string> {
        return await Backend.getBackendUri();
    }

    private async getOrgAndProjectName(): Promise<{ orgName: string, projectName: string, projectId: string }> {
        const orgName = await Backend.getCurrentOrganizationName();
        const project = await Backend.getProject();
        return { 
            orgName: orgName, 
            projectName: project.name, 
            projectId: project.id 
        };
    }

    public async trimGroups(groups: IIdentity[]): Promise<IIdentity[]> {
        // if (this.runningOnLocalHost()) {
        //     await this.delay(1);
        //     return groups;
        // }

        const { orgName, projectName } = await this.getOrgAndProjectName();        
        const projectNameMatch = `[${projectName}]\\`.toLowerCase();
        const orgNameMatch = `[${orgName}]\\`.toLowerCase();
        const teamFoundationMatch = "[TEAM FOUNDATION]\\".toLowerCase();

        const trimmedCollection = (groups || []).filter((identity: any) => {
            const displayName = `${identity.displayName}`.toLowerCase();
            const startsWithProjectName = displayName.startsWith(projectNameMatch);
            const startsWithOrgName = displayName.startsWith(orgNameMatch);
            const startsWithTeamFoundation = displayName.startsWith(teamFoundationMatch);

            // aad groups will not follow the pattern of [project]\ or [org]\ or [team foundation]\ so we need to exclude them
            if(`${identity.originDirectory}`.toLowerCase() === "aad") {
                return true;
            }
            
            //const startsWithAadPattern = (!(identity.subjectDescriptor != null && identity.subjectDescriptor.length > 0));            
            return startsWithProjectName || startsWithOrgName || startsWithTeamFoundation;
        });
        return trimmedCollection;
    }    

    public async translateSubjectDescriptorsToDescriptors(subjectDescriptors: string): Promise<AzDoTranslatedIdentityDescriptor[]> {
        if (this.runningOnLocalHost()) {
            await this.delay(1000);            
            return [];
        }

        var backendURI = await this.getBackendUri();
        const backendUri = `${backendURI}/api/Identity/translateDescriptors`;
            const response = await fetch(backendUri, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await this.getAccessToken()}`
                },
                body: JSON.stringify({
                    subjectDescriptors: subjectDescriptors
                })
            });    
            const translationResult = await response.json();
            return translationResult;
    }

    public async materializeIdentity(identity: IIdentity): Promise<IIdentity> {
        /*if (this.runningOnLocalHost()) {
            await this.delay(1000);            
            return identity;
        }*/

        const { orgName, projectName } = await this.getOrgAndProjectName(); 
        var backendURI = await this.getBackendUri();
        
        const backendUri = `${backendURI}/api/devops/${orgName}/identity/materialize`;
        const response = await fetch(backendUri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            },
            body: JSON.stringify(identity)
        });    
        const materializedIdentity = await response.json();            
        return materializedIdentity;
    }

    public async searchIdentities(filter: string): Promise<IIdentity[]> {
        /*if (this.runningOnLocalHost()) {
            await this.delay(1000);
            const result = (DummyData.identities as any);
            return result;
        }*/

        const { orgName, projectName } = await this.getOrgAndProjectName(); 
        var backendURI = await this.getBackendUri();
        const backendUri = `${backendURI}/api/devops/${orgName}/identity/search`;
        const response = await fetch(backendUri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            },
            body: JSON.stringify({
                query: filter,
                identityTypes: ["group"],
                operationScopes: ["ims", "source"],
                options: {
                    MinResults: 5,
                    MaxResults: 20
                },
                properties: IdentityV2Client.CommonFields
            })
        });            
        return response.json();
    }

    public async getSubject(subjectDescriptor: string): Promise<Graph.GraphSubject> {

        return this.beginRequest<Graph.GraphSubject>({
            apiVersion: "7.0",
            routeTemplate: "_apis/identities",
            queryParams: {
                subjectDescriptors: subjectDescriptor,
                queryMembership: "None"
            }
        });
    }
}

export default getClient(IdentityV2Client);