
import { IIdentity } from "azure-devops-ui/IdentityPicker";

export interface IGenericResource {
    id: string;
    name: string;
}

export const ResourceKind = { 
    Repository: "Repository",
    Library: "Library",
    Pipeline: "Pipeline",
    Environment: "Environment",
    Endpoint: "Endpoint",    
    Folder: "Folder"
}

export interface ILinkEntity {
    id: string;
    kind: string;
    folderId: string;
    resourceId: string;
    resourceName: string;
    projectId: string;
    lastModified: Date;
    createdOn: Date;
    createdBy: User;
    lastModifiedBy: User;
    enforcementStatus: { lastEnforcedAt: Date, enforcementStatus: string } | undefined;
}

export interface User {
    id: string;
    descriptor: string;
    displayName: string;
    imageUrl: string;
    name: string;
}


export interface ICurrentUserRole {
    isAdmin: boolean;
    isProjectCollectionAdmin: boolean;
    isProjectAdmin: boolean;
}

export interface IFolderMembership {
    roleName: string;
    groupName: string;
    subjectDescriptor: string;
}

export interface IFolderSecurity {
    isAdmin: boolean;
    isContributor: boolean;
    isReader: boolean;
    memberships: IFolderMembership[];
}

export interface IFolder {
    id: string;
    name: string;
    kind: string;
    parentFolderId: string;
    path: string;
    description: string;
    ciNumber: string;
    lastModified: Date;
    createdOn: Date;
    createdBy: User;
    lastModifiedBy: User;
    hasChildren: boolean;
    security: IFolderSecurity;
}


export enum Grant {
    NotSet = "NotSet",
    Allow = "Allow",
    Deny = "Deny"
}

export interface IRoleDefinition {
    displayName: string;
    name: string;
    allowPermissions: number;
    denyPermissions: number;
    identifier: string;
    description: string;
    scope: string;
}

export interface IRoleDescriptor {
    identity: IIdentity;
    roleDefinition: IRoleDefinition;
}

export interface PermissionSpec {
    identity: IIdentity;
    permission: IPermission[];
    role: IRoleDefinition;
}

export interface IPermission {
    bit: number;
    displayName: string;
    grant: Grant;
}

export interface ICustomRole {
    id: string;
    projectId: string;    
    name: string;    
    repositoryPermissionGrants: IPermission[];
    buildPermissionGrants: IPermission[];
    releasePermissionGrants: IPermission[];
    serviceEndpointRole: IRoleDefinition;
    environmentRole: IRoleDefinition;
    libraryRole: IRoleDefinition;
}

export interface IRoleAssignment {
    roleAssignmentId?: string;
    identity: IIdentity,
    role: ICustomRole
}

export interface IRepository {
    id: string;
    name: string;
    url: string;
    size: number;
    remoteUrl: string;
    sshUrl: string;
    webUrl: string;
}
