
import * as SDK from "azure-devops-extension-sdk";
import { GitRestClient } from 'azure-devops-extension-api/Git';
import * as Git from "azure-devops-extension-api/Git/Git";
import { 
    IFolder, IRoleDescriptor, IRoleDefinition, 
    ILinkEntity, ResourceKind, IGenericResource, 
    IPermission, ICustomRole, IRoleAssignment,
    IFolderSecurity, ICurrentUserRole } from "../schemas/schemas";
import { IIdentity } from "azure-devops-ui/IdentityPicker";
import { CommonServiceIds, getClient, IProjectInfo, IProjectPageService } from "azure-devops-extension-api";
import { ServiceEndpointRestClient } from 'azure-devops-extension-api/ServiceEndpoint';
import * as TaskAgent from "azure-devops-extension-api/TaskAgent";
import { TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent';
import DummyData  from './localDevelopment';
import ConfigService from "./configService";

class Backend {
    private delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    public runningOnLocalHost() {
        return document.location.hostname === 'localhost';
    }

    public async getAccessToken(): Promise<string> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiIzNjMzMzRjZS0wOGIwLTRiZTctYTk1MC0zMjU2ZjM3YWQwNzQiLCJzY3AiOiJ2c28uYWdlbnRwb29sc19tYW5hZ2UgdnNvLmFuYWx5dGljcyB2c28uYXVkaXRsb2cgdnNvLmJ1aWxkIHZzby5idWlsZF9leGVjdXRlIHZzby5jb2RlX2Z1bGwgdnNvLmNvZGVfbWFuYWdlIHZzby5kYXNoYm9hcmRzX21hbmFnZSB2c28uZW52aXJvbm1lbnRfbWFuYWdlIHZzby5leHRlbnNpb24uZGF0YV93cml0ZSB2c28uZXh0ZW5zaW9uLmRlZmF1bHQgdnNvLmV4dGVuc2lvbl9tYW5hZ2UgdnNvLmdyYXBoX21hbmFnZSB2c28uaWRlbnRpdHlfbWFuYWdlIHZzby5tZW1iZXJlbnRpdGxlbWVudG1hbmFnZW1lbnRfd3JpdGUgdnNvLnByb2plY3RfbWFuYWdlIHZzby5yZWxlYXNlIHZzby5yZWxlYXNlX2V4ZWN1dGUgdnNvLnJlbGVhc2VfbWFuYWdlIHZzby5zZWN1cml0eV9tYW5hZ2UgdnNvLnNlcnZpY2VlbmRwb2ludCB2c28uc2VydmljZWVuZHBvaW50X21hbmFnZSB2c28uc2VydmljZWVuZHBvaW50X3F1ZXJ5IHZzby5zeW1ib2xzX21hbmFnZSB2c28udGFza2dyb3Vwc19tYW5hZ2UgdnNvLnZhcmlhYmxlZ3JvdXBzX21hbmFnZSB2c28udmFyaWFibGVncm91cHNfcmVhZCB2c28ud2lraSB2c28ud2lraV93cml0ZSB2c28ud29ya19mdWxsIiwiYXVpIjoiZjU3ZjlmMWItMGQ5OS00Y2ZiLTlhOTAtYmU5YjNmMWNiNTllIiwiaGFpIjoiMDJiOTExZWMtZjkzYS00MDIxLWIyMjktNWEwYzEwNDU5YTZjIiwic2lkIjoiZGQ5NDhhNTktMTVhYS00ZmZmLTljZjYtY2ExMjYwYWE2NjZjIiwiaXNzIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsImF1ZCI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb218dnNvOmEwZjRjNWI0LTlhNTEtNDY2YS04NDcwLTBkZTIwZmJiZmU1NiIsIm5iZiI6MTcwNTY2NTczNSwiZXhwIjoxNzA1NjY5OTM1fQ.fbbcmxuoLc27n1o_Qz5T67d2Nt0yXY35uoJA9H54_hwqaCnGvreve-DNQY4d7VOqkGMfCWikeJ5QUSrY0YohZz-gibr36TXt7GaxRLgJsbzrYAN5r8qoo9zpc2fZ6PsFc_5H0ZadhhE0lA9wh8x_MdoPsEW7IuKQDBVww8J3cyBC67A8n8yamKoeqXf3dB5ifVWRmxWRgRmxmqvp7L1g9GZoemshGZ9_JiUewrYN-EtMK-jqsbXbZUg89fRjNY8NzT0W_YrM4ji71TKuPdVsLswmbzGeNm7s5HJHswKZuBakGjJZbpcOFGEwyz_ntdgrQy1C3xIzub2SvF2Fdv0K8g";
        }
        const accessToken = await SDK.getAccessToken();
        return accessToken;
    }

    public async getCurrentOrganizationName(): Promise<any> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return "moim";
        }
        const hostInfo = SDK.getHost();
        return (hostInfo ? hostInfo.name : '');
    }

    public async getProjectId(): Promise<string> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return "1853c648-0f7d-4f1e-80ab-fd1ecd333520";
        }
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        return (project ? project.id : '');
    }
    
    public async getProject(): Promise<IProjectInfo> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return { id : "PROJECT_ID_FAKE", name: "PROJECT_NAME_FAKE" };
        }
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        return project as any;
    }

    public async getBackendUri(): Promise<string> {
        if (this.runningOnLocalHost()) {
            await this.delay(1);
            return "https://azdo-control-panel-backend.wittyfield-afb7ce64.westeurope.azurecontainerapps.io";
        }

        const globalConfig = await ConfigService.getGlobalExtensionConfig();
        return globalConfig.complianceConfig.backendUri;
    }

    public async getCurrentUser(): Promise<{
        descriptor: string,
        displayName: string,
        imageUrl: string,
        name: string
    }> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return {
                "descriptor": "moimhossain",
                "displayName": "moimhossain",
                "imageUrl": "https://dev.azure.com/moim/_apis/GraphProfile/MemberAvatars/aad.ZTBmZjNjMjYtM2ViZC03YjRmLWJmM2YtNjY1N2U3ODdiNDYz?size=2&1701862547270",
                "name": "moimhossain"
            };
        }
        const user = SDK.getUser();
        return user;
    }

    
    public async getCurrentUserBuiltInRole(): Promise<ICurrentUserRole> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();
        var response = await fetch(`${backendUri}/api/${projectId}/security/currentUserRole`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const currentUserRole = await response.json();
        return currentUserRole;     
    }


    public async getRootFolders(): Promise<IFolder[]> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();
        var response = await fetch(`${backendUri}/api/${projectId}/folders`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const folders = await response.json();
        return folders;     
    }

    public async getChildFolders(parentFolderId: string): Promise<IFolder[]> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/folders/${parentFolderId}/children`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const folders = await response.json();
        return folders;    
    }

    public async createTopLevelFolder(
        payload: {
            name: string,
            kind: string,
            description: string,
            ciNumber: string,
            createdBy: {
                descriptor: string,
                displayName: string,
                imageUrl: string,
                name: string
            },
        }): Promise<IFolder> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/folders`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }, body: JSON.stringify(payload)
        });
        const folder = await response.json();
        return folder;
    }

    public async createChildFolder(
        parentFolderId: string,
        payload: {
            name: string,
            kind: string,
            description: string,
            ciNumber: string,
            createdBy: {
                descriptor: string,
                displayName: string,
                imageUrl: string,
                name: string
            },
        }): Promise<IFolder> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/folders/${parentFolderId}/children`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }, body: JSON.stringify(payload)
        });
        const folder = await response.json();
        return folder;
    }

    public async modifyFolder(
        folderId: string,
        payload: {
            name: string,
            kind: string,
            description: string,
            ciNumber: string,
            lastModifiedBy: {
                descriptor: string,
                displayName: string,
                imageUrl: string,
                name: string
            },
        }): Promise<IFolder> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/folders/${folderId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }, body: JSON.stringify(payload)
        });
        const folder = await response.json();
        return folder;
    }

    public async deleteFolder(folderId: string): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/folders/${folderId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        return true;
    }
       
    public async setFolderSecurity(folderId: string, roles: IRoleDescriptor[]): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();


        var response = await fetch(`${backendUri}/api/${projectId}/security/roles`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            },
            body: JSON.stringify({
                folderId: folderId,
                resourceId: folderId,
                kind: ResourceKind.Folder,
                roleDescriptors: roles
            })
        });
        return true;
    }

    public async getFolderSecurity(folderId: string): Promise<IRoleDescriptor[]> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/security/${folderId}/${ResourceKind.Folder}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const securityResponse = await response.json();

        if (securityResponse && securityResponse.length > 0) {
            return securityResponse[0].roleDescriptors;
        }
        return [];
    }

    public async evaluateFolderPermission(folderId: string): Promise<IFolderSecurity> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/security/${folderId}/evaluatePermissions`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const securityResponse = await response.json();
        return securityResponse;
    }    

    public async getFolderRoleDefinitions(): Promise<IRoleDefinition[]> {
        const roleDefinitions: IRoleDefinition[] = [
            {
                "displayName": "Administrator",
                "name": "Administrator",
                "allowPermissions": 0,
                "denyPermissions": 0,
                "identifier": "custom.folderpermissions.Administrator",
                "description": "Administrator can administer permissions, manage, view and use folder.",
                "scope": "custom.folderpermissionsrole"
            },
            {
                "displayName": "User",
                "name": "User",
                "allowPermissions": 0,
                "denyPermissions": 0,
                "identifier": "custom.folderpermissions.User",
                "description": "User can view the folder but can't manage the permissions.",
                "scope": "custom.folderpermissionsrole"
            },
            {
                "displayName": "Reader",
                "name": "Reader",
                "allowPermissions": 0,
                "denyPermissions": 0,
                "identifier": "custom.folderpermissions.Reader",
                "description": "Reader can only view the folder.",
                "scope": "custom.folderpermissionsrole"
            }
        ];
        return roleDefinitions
    }


    private convertArrayToGenericResource(items: any[]): IGenericResource[] {
        const convertedItems = items.map((item) => {
            return {
                id: `${item.id}`,
                name: item.name                
            } as any;
        });
        return convertedItems as any;
    }

    public async getLibraries(): Promise<any[]> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return DummyData.variableGroups;
        }
        const currentProjectId = await this.getProjectId();
        const taskAgentClient = getClient(TaskAgentRestClient);
        var variableGroups = await taskAgentClient.getVariableGroups(currentProjectId);

        return this.convertArrayToGenericResource(variableGroups);
    }

    public async getEnvironments(): Promise<IGenericResource[]> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return DummyData.environments;
        }
        const currentProjectId = await this.getProjectId();
        const taskAgentClient = getClient(TaskAgentRestClient);
        const environments = await taskAgentClient.getEnvironments(currentProjectId);

        return this.convertArrayToGenericResource(environments);
    }

    public async getServiceEndpoints(): Promise<any[]> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return DummyData.serviceEndpoints;
        }
        const currentProjectId = await this.getProjectId();
        const serviceEndpointRestClient = getClient(ServiceEndpointRestClient);
        var serviceEndpoints = await serviceEndpointRestClient.getServiceEndpoints(currentProjectId);
        return serviceEndpoints;
    }

    private async getRepositories(): Promise<Git.GitRepository[]> {
        if(this.runningOnLocalHost()) {
            this.delay(1000);
            return DummyData.repositories;
        }
        const currentProjectId = await this.getProjectId();
        const gitRestClient = getClient(GitRestClient);
        var repositories = await gitRestClient.getRepositories(currentProjectId);
        return repositories;
    }

    public async getResourcesAsync(resourceKind: string): Promise<IGenericResource[]> {        
        if (resourceKind === ResourceKind.Repository) {
            const repositories = await this.getRepositories();
            return repositories;
        } else if (resourceKind === ResourceKind.Endpoint) {
            const serviceEndpoints = await this.getServiceEndpoints();
            return serviceEndpoints;
        } else if (resourceKind === ResourceKind.Environment) {
            const environments = await this.getEnvironments();
            return environments;
        } else if (resourceKind === ResourceKind.Library) {
            const variableGroups = await this.getLibraries();
            return variableGroups;
        }
        return [];
    }

    public async getLinkedReources(folderId: string, resourceKind: string): Promise<ILinkEntity[]> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/links/${folderId}/${resourceKind}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const links = await response.json();
        return links;
    }

    public async associateResourceToFolder(
        folderId: string, resourceKind: string, resourceId: string, resourceName: string): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();
        const user = await this.getCurrentUser();

        var response = await fetch(`${backendUri}/api/${projectId}/links`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }, body: JSON.stringify({
                folderId: folderId,
                resourceId: resourceId,
                resourceName: resourceName,
                kind: resourceKind,
                by: user
              })
        });
        return true;
    }

    public async removeLink(linkId: string): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/links/${linkId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        return true;
    }




    public async getCustomRoles(): Promise<ICustomRole[]> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/custom-roles`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const roles = await response.json();
        return roles;
    }

    public async createCustomRole(        
        payload: { name: string, repositoryPermissionGrants: IPermission[]}): Promise<ICustomRole> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/custom-roles`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }, 
            body: JSON.stringify(payload)
        });
        const role = await response.json();
        return role;
    }

    public async modifyCustomRole(
        roleId: string, 
        payload: { name: string, repositoryPermissionGrants: IPermission[]}): Promise<ICustomRole> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/custom-roles/${roleId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }, 
            body: JSON.stringify(payload)
        });
        const role = await response.json();
        return role;
    }

    public async deleteCustomRole(roleId: string): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/custom-roles/${roleId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        return true;
    }

    public async deleteCustomRoleAssignment(roleAssignmentId: string): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/custom-roles/roleAssignments/${roleAssignmentId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        return true;
    }

    public async createCustomRoleAssignment(
        folderId: string,        
        identity: IIdentity,
        customRoleId: string): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/custom-roles/roleAssignments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }, 
            body: JSON.stringify({
                folderId: folderId,                
                identity: identity,
                customRoleId: customRoleId
            })
        });
        const roleAssignment = await response.json();
        return roleAssignment;
    }
    
    public async getCustomRoleAssignments(folderId: string): Promise<IRoleAssignment[]> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();

        var response = await fetch(`${backendUri}/api/${projectId}/custom-roles/roleAssignments/${folderId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
        });
        const unformattedData: any[] = await response.json();
        
        const roles: IRoleAssignment[] = [];

        for(const data of unformattedData) {
            roles.push({
                roleAssignmentId: data.roleAssignmentId,
                identity: data.identity,
                role: {
                    id: data.customRoleId,
                    name: data.roleName,
                    projectId: data.projectId
                } as ICustomRole
            } as IRoleAssignment);
        }        
        return roles;
    }

    public async createRepositoryAsync(folderId: string, name: string): Promise<any> {
        const backendUri = await this.getBackendUri();
        const projectId = await this.getProjectId();
        const user = await this.getCurrentUser();

        var response = await fetch(`${backendUri}/api/${projectId}/resources/repository`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await this.getAccessToken()}`
            },
            body: JSON.stringify({
                name: name,
                folderId: folderId,
                requestedBy: user
            })
        });
        return true;
    }    
}


export default (new Backend());