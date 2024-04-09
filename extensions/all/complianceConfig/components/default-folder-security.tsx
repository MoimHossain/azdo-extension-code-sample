
import * as React from "react";
import { IRoleDescriptor, IRoleDefinition } from "../../../shared/schemas/schemas";
import RoleConfigPanel from "../../../shared/components/role-config-panel";
import Backend from "../../../shared/services/backend";
import { ICurrentUserRole } from "../../../shared/schemas/schemas";

const DefaultFolderSecurityConfig = (
    props: {
        style?: React.CSSProperties,
        currentUserRole: ICurrentUserRole
    }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [roleDefinitions, setRoleDefinitions] = React.useState<IRoleDefinition[]>([]);
    const [folderSecurity, setFolderSecurity] = React.useState<IRoleDescriptor[]>([]);

    React.useEffect(() => {        
        setTimeout(async () => {
            await reloadData();
        }, 1);
    }, []);

    const reloadData = async () => {
        setLoading(true);
        const projectId = await Backend.getProjectId();
        const roleDefinitions = await Backend.getFolderRoleDefinitions();
        setRoleDefinitions(roleDefinitions);
        const folderSecurity = await Backend.getFolderSecurity(projectId);            
        setFolderSecurity(folderSecurity);
        setLoading(false);
    }

    const commitChanges = async (roleDescriptors: IRoleDescriptor[]) => {
        setLoading(true);
        const projectId = await Backend.getProjectId();
        await Backend.setFolderSecurity(projectId, roleDescriptors);
        const updatedRols = await Backend.getFolderSecurity(projectId);
        setFolderSecurity(updatedRols);
        setLoading(false);
    }

    const onRoleDeleted = async (index: number, spec: IRoleDescriptor) => {
        const newSpecs = [...folderSecurity];
        newSpecs.splice(index, 1);
        await commitChanges(newSpecs);
    }

    const onNewRoleAdded = async (specification: IRoleDescriptor) => {
        var neverAdded = true;

        folderSecurity.forEach((spec: any) => {
            if (spec.identity.entityId === specification.identity.entityId) {
                neverAdded = false;
                return false;
            }
        });

        if (neverAdded === true) {
            const newSpecs = [...folderSecurity];
            newSpecs.push(specification);
            await commitChanges(newSpecs);
        }
    }

    return (
        <div style={{
            marginLeft: "16px",
            paddingBottom: "16px"
        }}>
            <RoleConfigPanel            
                readonly={props.currentUserRole.isAdmin !== true}
                showProgressInsteadOfRows={loading}
                header=""
                description=""
                roleDefinitions={roleDefinitions}
                onReload={reloadData}
                onNewRoleAdded={onNewRoleAdded}
                onRoleDeleted={onRoleDeleted}
                specifications={folderSecurity} />
        </div>
    );
}

export default DefaultFolderSecurityConfig;