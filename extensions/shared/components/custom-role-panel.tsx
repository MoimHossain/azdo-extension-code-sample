

import * as React from "react";
import { TableFrame, TableRow, TableCell, ITableColumn } from "./htmlFragments";
import { Button } from "azure-devops-ui/Button";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { IPermission, ICustomRole } from "../schemas/schemas";
import { ServiceEndpointRoles, EnvironmentRoles, LibraryRoles } from "../schemas/common-constants";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { Page } from "azure-devops-ui/Page";
import Backend from "../services/backend";
import NewCustomRoleDialog from "./new-custom-role-dialog";

const CustomRolePanel = (
    props: {        
        defaultRepositoryPermissionGrants: IPermission[],
        defaultBuildPermissionGrants: IPermission[],
        defaultReleasePermissionGrants: IPermission[],
        header?: string,
        description?: string,
        readonly?: boolean
    }) => {
    const [loadingData, setLoadingData] = React.useState<boolean>(false);
    const [customRoles, setCustomRoles] = React.useState<ICustomRole[]>([]);
    const [selectedRole, setSelectedRole] = React.useState<ICustomRole | undefined>(undefined);
    const [newRoleDialogOpen, setNewRoleDialogOpen] = React.useState<boolean>(false);
    const columns: ITableColumn[] = [{ name: " ", width: 10 }, { name: "Custom Role", width: 260 }, { name: " ", width: 10 }, { name: " ", width: 10 }, { name: " ", width: 10 }];
    
    const getCommandBarItems = (): IHeaderCommandBarItem[] => {
        const items: IHeaderCommandBarItem[] = [];
        items.push({
            id: "refresh",
            text: "Refresh",
            onActivate: () => {
                setTimeout(async () => {
                    await reloadCustomRoles();
                }, 1);
            },
            iconProps: {
                iconName: "Refresh"
            }
        });
        if(props.readonly !== true) {
            items.push({
                iconProps: {
                    iconName: "Add"
                },
                id: "createNewRecord",
                important: true,
                isPrimary: true,
                onActivate: () => {
                    setSelectedRole(undefined);
                    setNewRoleDialogOpen(true);
                },
                text: "New Role definition",
                tooltipProps: {
                    text: "Add a new role definition"
                }
            });
        }
        return items;
    }
    

    const reloadCustomRoles = async () => {
        setLoadingData(true);
        const customRoles: ICustomRole[] = await Backend.getCustomRoles();
        setLoadingData(false);
        setCustomRoles(customRoles);
    }

    React.useEffect(() => {
        setLoadingData(true);
        setTimeout(async () => {
            await reloadCustomRoles();
        }, 1);
    }, []);



    return (
        <Page>
            <Header
                title={props.header}
                description={props.description}
                commandBarItems={getCommandBarItems()}
                titleSize={TitleSize.Medium}
                titleAriaLevel={3}
            />

            <TableFrame columns={columns}>
                <>
                    {
                        newRoleDialogOpen === true &&
                        <NewCustomRoleDialog                            
                            repositoryPermissionGrants={selectedRole != null ? selectedRole.repositoryPermissionGrants : props.defaultRepositoryPermissionGrants}
                            buildPermissionGrants={selectedRole != null ? selectedRole.buildPermissionGrants : props.defaultBuildPermissionGrants}
                            releasePermissionGrants={selectedRole != null ? selectedRole.releasePermissionGrants : props.defaultReleasePermissionGrants}
                            serviceEndpointRole={selectedRole != null ? selectedRole.serviceEndpointRole : ServiceEndpointRoles[0]}
                            environmentRole={selectedRole != null ? selectedRole.environmentRole : EnvironmentRoles[0]}
                            libraryRole={selectedRole != null ? selectedRole.libraryRole : LibraryRoles[0]}
                            roleName={selectedRole != null ? selectedRole.name : undefined}
                            isModifyMode={selectedRole != null}
                            roleId={selectedRole != null ? selectedRole.id : undefined}
                            onDismiss={() => setNewRoleDialogOpen(false)} />
                    }
                    {

                        loadingData === false && customRoles.map((customRole: ICustomRole, index: number) => {                            
                            return (
                                <TableRow key={index}>
                                    <>
                                        <TableCell>
                                            <>
                                            </>
                                        </TableCell>
                                        <TableCell>
                                            <span title={customRole.name} className="text-ellipsis"><b>{customRole.name}</b></span>
                                        </TableCell>
                                        <TableCell>
                                            <>
                                                {
                                                    props.readonly !== true &&
                                                    <Button
                                                        subtle={true}
                                                        iconProps={{ iconName: "Edit" }}
                                                        onClick={() => {                                                            
                                                            setSelectedRole(customRole);
                                                            setNewRoleDialogOpen(true);
                                                        }}
                                                        ariaLabel="Edit"
                                                        tooltipProps={{ text: "Edit" }}
                                                    />
                                                }
                                            </>
                                        </TableCell>
                                        <TableCell>
                                            <>
                                                {
                                                    props.readonly !== true &&
                                                    <Button
                                                        subtle={true}
                                                        iconProps={{ iconName: "Delete" }}
                                                        onClick={async () => {
                                                            await Backend.deleteCustomRole(customRole.id);
                                                            await reloadCustomRoles();
                                                        }}
                                                        ariaLabel="Delete"
                                                        tooltipProps={{ text: "Delete" }}
                                                    />
                                                }
                                            </>
                                        </TableCell>
                                    </>
                                </TableRow>
                            );
                        })
                    }
                    <>
                        {
                            loadingData === true &&
                            <TableRow>
                                <>
                                    <TableCell colSpan={3}>
                                        <div className="flex-row">
                                            <Spinner size={SpinnerSize.medium} />
                                            <div style={{ marginLeft: 4 }} />
                                            <span>Please wait...</span>
                                        </div>
                                    </TableCell>
                                </>
                            </TableRow>
                        }
                    </>
                    <>
                        {
                            loadingData !== true && customRoles.length === 0 &&
                            <TableRow>
                                <>
                                    <TableCell colSpan={3}>
                                        <div className="flex-row">
                                            <span style={{ marginLeft: 10 }}>No custom roles defined</span>
                                        </div>
                                    </TableCell>
                                </>
                            </TableRow>
                        }
                    </>
                </>
            </TableFrame>
        </Page>
    );
}

export default CustomRolePanel;