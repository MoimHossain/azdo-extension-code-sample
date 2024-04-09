

import * as React from "react";
import { TableFrame, TableRow, TableCell, ITableColumn } from "./htmlFragments";
import { Button } from "azure-devops-ui/Button";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { IRoleDescriptor, IRoleDefinition } from "../schemas/schemas";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { Page } from "azure-devops-ui/Page";
import { HorizontalChildContainer } from "./htmlFragments";
import NewRoleDialog from "./new-role-dialog";
import { Icon } from "azure-devops-ui/Icon";
import {
    IIdentity
} from "azure-devops-ui/IdentityPicker";


const RoleConfigPanel = (
    props: {
        header?: string,
        description?: string,
        showProgressInsteadOfRows?: boolean,
        loadingLabel?: string,
        readonly?: boolean,
        specifications: IRoleDescriptor[],
        roleDefinitions: IRoleDefinition[],
        onReload?: () => Promise<void>,
        onNewRoleAdded: (specification: IRoleDescriptor) => void,
        onRoleDeleted: (index: number, spec: IRoleDescriptor) => void
    }) => {
    const [newRoleDialogOpen, setNewRoleDialogOpen] = React.useState<boolean>(false);
    const columns: ITableColumn[] = [{ name: " ", width: 10 }, { name: "Identity", width: 60 }, { name: "Role", width: 60 }];
    
    const getCommandBarItems = (): IHeaderCommandBarItem[] => {
        const commandBarItems: IHeaderCommandBarItem[] = [];

        if(props.onReload) {
            commandBarItems.push({
                id: "refresh",
                text: "Refresh",
                onActivate: () => {
                    setTimeout(async () => {
                        if(props.onReload) {
                            await props.onReload();
                        }
                    }, 1);
                },
                iconProps: {
                    iconName: "Refresh"
                }
            });
        }


        if(props.readonly !== true) {
            commandBarItems.push({
                iconProps: {
                    iconName: "Add"
                },
                id: "createNewRecord",
                isPrimary: true,
                onActivate: () => {
                    setNewRoleDialogOpen(true);
                },
                text: "New Role",
                tooltipProps: {
                    text: "Add a new role"
                }
            });
        }

        return commandBarItems;
    }


    const onRoleAdd = (identity: IIdentity, roleDefinition: IRoleDefinition) => {
        if (identity && roleDefinition) {
            setNewRoleDialogOpen(false);
            const newPermission = {
                identity: identity,
                roleDefinition: roleDefinition
            };
            props.onNewRoleAdded(newPermission);
        }
    }

    return (
        <Page className="section-inside-page">
            <Header
                title={props.header}
                description={props.description}
                commandBarItems={getCommandBarItems()}
                titleSize={TitleSize.Medium}
                titleAriaLevel={3}
            />
            {
                newRoleDialogOpen === true &&
                <NewRoleDialog
                    onRoleAdd={onRoleAdd}
                    onClose={() => setNewRoleDialogOpen(false)}
                    roleDefinitions={props.roleDefinitions} />
            }
                <TableFrame columns={columns}>
                    <>
                        {
                            !(props.showProgressInsteadOfRows === true) &&
                            <>
                                {
                                    props.specifications.map((specification: IRoleDescriptor, index: number) => {
                                        return (
                                            <TableRow key={index}>
                                                <>
                                                    <TableCell style={{ paddingLeft: 10 }}>
                                                        <>
                                                        {
                                                            props.readonly !== true &&
                                                            <Button
                                                                subtle={true}
                                                                iconProps={{ iconName: "Delete" }}
                                                                onClick={() => props.onRoleDeleted(index, specification)}
                                                                ariaLabel="Delete"
                                                                tooltipProps={{ text: "Delete" }}
                                                            />
                                                        }
                                                        {
                                                            props.readonly === true && <Icon iconName="LockSolid" />
                                                        }
                                                        </>
                                                    </TableCell>
                                                    <TableCell>
                                                        <>
                                                            <span
                                                                title={specification.identity.displayName}
                                                                className="text-ellipsis"><b>{specification.identity.displayName}</b></span>
                                                            <span className="fontSizeMS font-size-ms text-ellipsis secondary-text">
                                                                {specification.identity.description}
                                                            </span>
                                                        </>
                                                    </TableCell>
                                                    <TableCell title={specification.roleDefinition.description}>
                                                        <>
                                                            <span title={specification.roleDefinition.description} className="text-ellipsis"><b>{specification.roleDefinition.displayName}</b></span>
                                                            <span className="fontSizeMS font-size-ms text-ellipsis secondary-text">{specification.roleDefinition.description}</span>
                                                        </>
                                                    </TableCell>
                                                </>
                                            </TableRow>
                                        );
                                    })
                                }
                            </>
                        }
                        <>
                            {
                                props.showProgressInsteadOfRows === true &&
                                <TableRow>
                                    <>
                                        <TableCell colSpan={3}>
                                            <HorizontalChildContainer style={{ paddingLeft: 20 }}>
                                                <Spinner size={SpinnerSize.medium} />
                                                <span style={{ marginLeft: 10 }}>Loading...</span>
                                            </HorizontalChildContainer>
                                       
                                        </TableCell>
                                    </>
                                </TableRow>
                            }
                        </>
                        <>
                        {
                            props.showProgressInsteadOfRows !== true && props.specifications.length === 0 &&
                            <TableRow>
                                <>
                                    <TableCell colSpan={3}>
                                        <div className="flex-row">
                                            <span style={{ marginLeft: 10 }}>No roles configured</span>
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

export default RoleConfigPanel;