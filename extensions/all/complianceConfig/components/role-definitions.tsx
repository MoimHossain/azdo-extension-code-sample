
import * as React from "react";
import { IPermission, Grant } from "../../../shared/schemas/schemas";
import { ICurrentUserRole } from "../../../shared/schemas/schemas";
import CustomRolePanel from "../../../shared/components/custom-role-panel";
import { BuiltInRepositoryPermissions, BuildPermissions, ReleasePermissions } from "../../../shared/schemas/common-constants";


const getDefaultRepositoryPermissionGrants = (): IPermission[] => {
    const permissions: IPermission[] = [];
    BuiltInRepositoryPermissions.forEach((privilege) => {
        permissions.push({
            displayName: privilege.displayName,
            bit: privilege.bit,
            grant: Grant.NotSet
        });
    });
    return permissions;
}

const getDefaultBuildPermissionGrants = (): IPermission[] => {
    const permissions: IPermission[] = [];
    BuildPermissions.forEach((privilege) => {
        permissions.push({
            displayName: privilege.displayName,
            bit: privilege.bit,
            grant: Grant.NotSet
        });
    });
    return permissions;
}

const getDefaultReleasePermissionGrants = (): IPermission[] => {
    const permissions: IPermission[] = [];
    ReleasePermissions.forEach((privilege) => {
        permissions.push({
            displayName: privilege.displayName,
            bit: privilege.bit,
            grant: Grant.NotSet
        });
    });
    return permissions;
}


const RoleDefinitionConfig = (
    props: {
        style?: React.CSSProperties,
        currentUserRole: ICurrentUserRole
    }) => {
    console.log("Current user role", props.currentUserRole)
    
    return (
        <div style={{
            marginLeft: "16px",
            paddingBottom: "16px"
        }}>
            <CustomRolePanel                 
                defaultRepositoryPermissionGrants={getDefaultRepositoryPermissionGrants()}
                defaultBuildPermissionGrants={getDefaultBuildPermissionGrants()}
                defaultReleasePermissionGrants={getDefaultReleasePermissionGrants()}
                readonly={props.currentUserRole.isAdmin !== true}                
                header=""
                description="" />            
        </div>
    );
}

export default RoleDefinitionConfig;