
import * as React from "react";
import { IPermission, Grant } from "../../../shared/schemas/schemas";
import { ICurrentUserRole } from "../../../shared/schemas/schemas";
import CustomRolePanel from "../../../shared/components/custom-role-panel";


const builtInRepositoryPrivileges = [
    {
        displayName: "Bypass policies when completing pull requests",
        bit: 32768
    },
    {
        displayName: "Bypass policies when pushing",
        bit: 128
    },
    {
        displayName: "Contribute",
        bit: 4
    },
    {
        displayName: "Contribute to pull requests",
        bit: 16384
    },
    {
        displayName: "Create branch",
        bit: 16
    },
    {
        displayName: "Create repository",
        bit: 256
    },
    {
        displayName: "Create tag",
        bit: 32
    },
    {
        displayName: "Delete or disable repository",
        bit: 512,
    },
    {
        displayName: "Edit policies",
        bit: 2048,
    },
    {
        displayName: "Force push (rewrite history, delete branches and tags)",
        bit: 8
    },
    {
        displayName: "Manage notes",
        bit: 64
    },
    {
        displayName: "Manage permissions",
        bit: 8192
    },
    {
        displayName: "Read",
        bit: 2
    },
    {
        displayName: "Remove others' locks",
        bit: 4096
    },
    {
        displayName: "Rename repository",
        bit: 1024
    }
];

const getDefaultPermissionGrants = (): IPermission[] => {
    const permissions: IPermission[] = [];
    builtInRepositoryPrivileges.forEach((privilege) => {
        permissions.push({
            displayName: privilege.displayName,
            bit: privilege.bit,
            grant: Grant.NotSet
        });
    });
    return permissions;
}

const RepositoryRoleConfig = (
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
                resourceKind="Repository"
                defaultPermissionGrants={getDefaultPermissionGrants()}
                readonly={props.currentUserRole.isAdmin !== true}                
                header=""
                description="" />            
        </div>
    );
}

export default RepositoryRoleConfig;