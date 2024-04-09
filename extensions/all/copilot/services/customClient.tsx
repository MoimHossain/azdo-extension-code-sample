import * as SDK from "azure-devops-extension-sdk";
import { IdentityRef } from 'azure-devops-extension-api/WebApi';
import { RestClientBase } from "azure-devops-extension-api/Common/RestClientBase";
import { IVssRestClientOptions } from "azure-devops-extension-api/Common/Context";
import { IUserContext, getUser } from 'azure-devops-extension-sdk';
import { CoreRestClient } from 'azure-devops-extension-api/Core';
import { QueryExpand, WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking';
import { TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent';
import { GitRestClient } from 'azure-devops-extension-api/Git';
import { ServiceEndpointRestClient } from 'azure-devops-extension-api/ServiceEndpoint';
import { CommonServiceIds, getClient, IProjectPageService, IHostNavigationService } from "azure-devops-extension-api";


export class CustomClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) { super(options); }

    private async getRef(projectId: string, repoId: string, branchName: string) {        
        return await this.beginRequest<any[]>({
            method: "GET",
            apiVersion: "5.0-preview.1",
            routeTemplate: "{projectId}/_apis/git/repositories/{repoId}/refs",
            queryParams: {
                filter: `heads/${branchName}`,
                peelTags: true
            },
            routeValues: {
                repoId: repoId,
                projectId: projectId
            }
        });
    }

    private async createBranch(projectId: string, repoId: string, branchName: string, branchId: string) {
        return await this.beginRequest<any[]>({
            method: "POST",
            apiVersion: "5.0-preview.1",
            routeTemplate: "{projectId}/_apis/git/repositories/{repoId}/refs",
            body: [{
                name: `refs/heads/${branchName}`,
                newObjectId: branchId,
                oldObjectId: "0000000000000000000000000000000000000000"
            }],
            routeValues: {
                repoId: repoId,
                projectId: projectId
            }
        });
    }

    
    private async createPush(
        projectId: string,
        repoId: string, 
        sourceBranch: string, 
        targetBranch: string, 
        commitMessage: string, 
        fileName: string, 
        content: string) 
    {
        var refCollection: any = await this.getRef(projectId, repoId, sourceBranch);
        console.log(refCollection);
        var branchId = refCollection[0].objectId;
        var branchInfo = await this.createBranch(projectId, repoId, targetBranch, branchId);
        console.log(branchInfo);

        return await this.beginRequest<any[]>({
            method: "POST",
            apiVersion: "5.0-preview.2",
            routeTemplate: "_apis/git/repositories/{repoId}/pushes",
            body: {
                commits: [{
                    changes: [{
                        changeType: 1,
                        item: {
                            path: fileName //"/src/abc,txt"
                        },
                        newContent: {
                            content: content
                            //contentType: 0
                        }
                    }],
                    comment: commitMessage
                }],
                refUpdates: [{
                    name: `refs/heads/${targetBranch}`,
                    oldObjectId: branchId
                }]
            },
            routeValues: {
                repoId: repoId,
                projectId: projectId
            }
        });        
    }

    public async createPullRequest(
        projectId: string, 
        repoId: string, 
        sourceBranch: string, 
        targetBranch: string, 
        commitMessage: string,
        fileName: string,
        content: string,
        prTitle: string, 
        prDescription: string) {
            var push = await this.createPush(projectId, repoId, sourceBranch, targetBranch, commitMessage, fileName, content);
            console.log('push:', push);

            return await this.beginRequest<any[]>({
                method: "POST",
                apiVersion: "5.0-preview.1",
                routeTemplate: "{projectId}/_apis/git/repositories/{repoId}/pullRequests",
                body: {
                    description: prDescription,
                    isDraft: false,
                    labels: [],
                    reviewers: [],
                    sourceRefName: `refs/heads/${targetBranch}`,
                    targetRefName: `refs/heads/${sourceBranch}`,
                    title: prTitle
                },
                queryParams: {
                    supportsIterations: true
                },
                routeValues: {
                    repoId: repoId,
                    projectId: projectId
                }
            });
    }

}

