
import * as React from "react";
import { IFolder } from "../../../shared/schemas/schemas";
import { VssPersona } from "azure-devops-ui/VssPersona";
import { TableFrame, TableRow, TableCell, TimeAgo, HorizontalChildContainer } from "../../../shared/components/htmlFragments";
import { RENDER } from "../../../shared/schemas/commonTypes";
import { IRoleDescriptor, IRoleDefinition } from "../../../shared/schemas/schemas";
import Backend from "../../../shared/services/backend";
import RoleConfigPanel from "../../../shared/components/role-config-panel";
import CustomRoleAssignmentPanel from "../../../shared/components/custom-role-assignments";


const SecurityTab = (
    props: {
        style?: React.CSSProperties,
        folder: IFolder,
        readonly?: boolean
    }) => {
        const [loading, setLoading] = React.useState<boolean>(false);
        const [roleDefinitions, setRoleDefinitions] = React.useState<IRoleDefinition[]>([]);
        const [folderSecurity, setFolderSecurity] = React.useState<IRoleDescriptor[]>([]);

        const reloadData = async () => {
            setLoading(true);
            const roleDefinitions = await Backend.getFolderRoleDefinitions();
            setRoleDefinitions(roleDefinitions);
            const folderSecurity = await Backend.getFolderSecurity(props.folder.id);            
            setFolderSecurity(folderSecurity);
            setLoading(false);
        }
    
        React.useEffect(() => {
            setLoading(true);
            setTimeout(async () => {
                await reloadData();
            }, 1);
        }, [props.folder]);
    
        const commitChanges = async (roleDescriptors: IRoleDescriptor[]) => {
            setLoading(true);
            await Backend.setFolderSecurity(props.folder.id, roleDescriptors);
            const updatedRols = await Backend.getFolderSecurity(props.folder.id);
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
        <TableFrame className="property-table" style={{ marginLeft: -20 }} hideHeaders={true} columns={[]}>
            <>
            <TableRow className="ignore-cssnames">
                <TableCell colSpan={2}>
                    <RoleConfigPanel
                        readonly={props.readonly}
                        showProgressInsteadOfRows={loading}
                        header="Folder security"
                        description="Configure roles for this folder"
                        roleDefinitions={roleDefinitions}
                        onReload={reloadData}
                        onNewRoleAdded={onNewRoleAdded}
                        onRoleDeleted={onRoleDeleted}
                        specifications={folderSecurity} />
                </TableCell>
            </TableRow>
            <TableRow className="ignore-cssnames">
                <TableCell colSpan={2}><span>&nbsp;</span></TableCell>
            </TableRow>
            <TableRow className="ignore-cssnames">
                <TableCell colSpan={2}>
                    <CustomRoleAssignmentPanel 
                        style={{ paddingBottom: 40 }}                         
                        folder={props.folder} 
                        readonly={props.readonly} />
                </TableCell>
            </TableRow>              
            </>          
        </TableFrame>
    );
}

export default SecurityTab;
