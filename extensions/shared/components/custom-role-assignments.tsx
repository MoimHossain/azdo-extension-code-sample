
import * as React from "react";
import Backend from "../services/backend";
import { IFolder, ILinkEntity, ResourceKind, IGenericResource } from "../schemas/schemas";
import { Button } from "azure-devops-ui/Button";
import { TableFrame, TableRow, TableCell, ITableColumn, HorizontalChildContainer } from "./htmlFragments";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { Page } from "azure-devops-ui/Page";
import CustomRolePicker from "./custom-role-picker";
import { ICustomRole, IRoleAssignment } from "../schemas/schemas";
import { IIdentity } from "azure-devops-ui/IdentityPicker";
import { Icon } from "azure-devops-ui/Icon";

const CustomRoleAssignmentPanel = (
    props: {
        style?: React.CSSProperties,
        folder: IFolder,
        readonly?: boolean
    }) => {
    const titleText = "Resource Roles";
    const descriptionText = `Manage resource role assignments (i.e. Repository, Environment etc.) that are associated to ${props.folder.name}`;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [roleDialogOpen, setRoleDialogOpen] = React.useState<boolean>(false);
    const [roleAssignments, setRoleAssignments] = React.useState<IRoleAssignment[]>([]);
    const columns: ITableColumn[] = [{ name: " ", width: 10 }, { name: "Identity", width: 60 }, { name: "Role", width: 60 }];
    
    React.useEffect(() => {
        loadRoleAssignments();
    }, []);

    React.useEffect(() => {
        loadRoleAssignments();
    }, [props.folder]);

    const loadRoleAssignments = async () => {
        setLoading(true);
        const roleAssignments = await Backend.getCustomRoleAssignments(props.folder.id);
        setRoleAssignments(roleAssignments);
        setLoading(false);
    }


    const getCommandBarItems = (): IHeaderCommandBarItem[] => {
        const items: IHeaderCommandBarItem[] = [];

        items.push({
            id: "refresh",
            text: "Refresh",
            onActivate: () => {
                setTimeout(async () => {
                    await loadRoleAssignments();
                }, 1);
            },
            iconProps: {
                iconName: "Refresh"
            }
        });
        if (props.readonly !== true) {
            items.push({
                iconProps: { iconName: "Add" },
                id: "new-role",
                important: true,
                isPrimary: true,
                onActivate: () => setRoleDialogOpen(true),
                text: "New Role",
                tooltipProps: { text: "Assign a new role" }
            });
        }

        return items;
    }

    const deleteRoleAssignment = async (role: IRoleAssignment) => {
        const roleAssignmentId = role.roleAssignmentId;
        if (roleAssignmentId) {
            setTimeout(async () => {
                setLoading(true);
                await Backend.deleteCustomRoleAssignment(roleAssignmentId);
                await loadRoleAssignments();
            }, 1);
        }
    }

    const onRoleAdded = (identity: IIdentity, role: ICustomRole) => {
        setTimeout(async () => {
            setLoading(true);
            await Backend.createCustomRoleAssignment(props.folder.id, identity, role.id);
            await loadRoleAssignments();
        }, 1);
    }

    return (
        <Page className="section-inside-page">
            <Header
                title={titleText}
                description={descriptionText}
                commandBarItems={getCommandBarItems()}
                titleSize={TitleSize.Medium}
                titleAriaLevel={3}
            />
            <>
                <TableFrame style={props.style} columns={columns}>
                    <>
                        {
                            roleDialogOpen === true &&
                            <CustomRolePicker
                                onClose={() => setRoleDialogOpen(false)}
                                onRoleAdd={onRoleAdded} />

                        }
                        {
                            loading === true &&
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <HorizontalChildContainer style={{ paddingLeft: 20 }}>
                                        <Spinner size={SpinnerSize.medium} />
                                        <span style={{ marginLeft: 10 }}>Loading...</span>
                                    </HorizontalChildContainer>
                                </TableCell>
                            </TableRow>

                        }
                        {

                            loading !== true && roleAssignments.length > 0 &&
                            roleAssignments.map((roleAssignment: IRoleAssignment, index: number) => {
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
                                                            onClick={() => deleteRoleAssignment(roleAssignment)}
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
                                                        title={roleAssignment.identity.displayName}
                                                        className="text-ellipsis"><b>{roleAssignment.identity.displayName}</b></span>
                                                    <span className="fontSizeMS font-size-ms text-ellipsis secondary-text">
                                                        {roleAssignment.identity.description}
                                                    </span>
                                                </>
                                            </TableCell>
                                            <TableCell title={roleAssignment.role.name}>
                                                <span title={roleAssignment.role.name} className="text-ellipsis">{roleAssignment.role.name}</span>
                                            </TableCell>


                                        </>
                                    </TableRow>
                                );
                            })
                        }
                        {
                            loading !== true && roleAssignments.length <= 0 &&
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <HorizontalChildContainer>
                                        <span style={{ marginLeft: 10 }}>No roles assigned</span>
                                    </HorizontalChildContainer>
                                </TableCell>
                            </TableRow>
                        }
                    </>
                </TableFrame>
            </>
        </Page>
    );
}

export default CustomRoleAssignmentPanel;