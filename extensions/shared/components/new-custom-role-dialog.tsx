

import * as React from "react";
import { ContentSize } from "azure-devops-ui/Callout";
import { TableFrame, TableRow, TableCell, ITableColumn } from "./htmlFragments";

import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { IPermission, Grant, IRoleDefinition } from "../schemas/schemas";
import { Panel } from "azure-devops-ui/Panel";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { FormItem } from "azure-devops-ui/FormItem";
import { Dropdown } from "azure-devops-ui/Dropdown";
import Backend from "../services/backend";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { CommonConstants, ServiceEndpointRoles, EnvironmentRoles, LibraryRoles } from "../schemas/common-constants";

const NewCustomRoleDialog = (
    props: {
        repositoryPermissionGrants: IPermission[],
        buildPermissionGrants: IPermission[],
        releasePermissionGrants: IPermission[],
        serviceEndpointRole: IRoleDefinition,
        environmentRole: IRoleDefinition,
        libraryRole: IRoleDefinition,
        roleName?: string,
        isModifyMode?: boolean,
        roleId?: string,
        onDismiss: (reloadData?: boolean) => void
    }) => {
    const [repositoryPermissionGrants, setRepositoryPermissionGrants] = React.useState<IPermission[]>(props.repositoryPermissionGrants);
    const [buildPermissionGrants, setBuildPermissionGrants] = React.useState<IPermission[]>(props.buildPermissionGrants);
    const [releasePermissionGrants, setReleasePermissionGrants] = React.useState<IPermission[]>(props.releasePermissionGrants);
    const [name, setName] = React.useState<string>(props.roleName || "");
    const [operationInProgress, setOperationInProgress] = React.useState<boolean>(false);
    const [selectedTabId, setSelectedTabId] = React.useState<string>(CommonConstants.Tabs.Git.id);
    const [serviceEndpointRole, setServiceEndpointRole] = React.useState<IRoleDefinition>(props.serviceEndpointRole); 
    const [environmentRole, setEnvironmentRole] = React.useState<IRoleDefinition>(props.environmentRole);
    const [libraryRole, setLibraryRole] = React.useState<IRoleDefinition>(props.libraryRole);

    const getDialogButtons = (): any[] => {
        const items = [];
        items.push({ text: "Cancel", onClick: props.onDismiss });
        items.push({
            primary: true,
            disabled: operationInProgress === true || name.length === 0,
            text: props.isModifyMode === true ? "Modify" : "Create",
            onClick: async () => {
                setOperationInProgress(true);
                const payload = {
                    name: name,
                    repositoryPermissionGrants: repositoryPermissionGrants,
                    buildPermissionGrants: buildPermissionGrants,
                    releasePermissionGrants: releasePermissionGrants,
                    serviceEndpointRole: serviceEndpointRole,
                    environmentRole: environmentRole,
                    libraryRole: libraryRole
                };

                console.log("Payload", payload);

                if (props.isModifyMode === true && props.roleId != null) {
                    await Backend.modifyCustomRole(props.roleId, payload)
                }
                else {
                    await Backend.createCustomRole(payload);
                }
                setOperationInProgress(false);
                props.onDismiss();
            }
        });
        return items;
    }

    return (
        <Panel
            onDismiss={props.onDismiss}
            size={ContentSize.Auto}
            footerButtonProps={getDialogButtons()}
            description={"Create a new custom role"}
            titleProps={{ text: "New custom role" }} >

            <TableFrame style={{ width: 700, height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                <>
                    <TableRow className="ignore-cssnames">
                        <>
                            <TableCell style={{ width: '50%' }}>
                                <FormItem label="Name:">
                                    <TextField
                                        value={name}
                                        readOnly={false}
                                        spellCheck={false}
                                        required={true}
                                        onChange={(e, newValue) => setName(newValue)}
                                        placeholder="Name (e.g. 'Developer')"
                                        width={TextFieldWidth.standard}
                                    />
                                </FormItem>
                            </TableCell>
                        </>
                    </TableRow>
                    <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                        <>
                            <TableCell style={{ width: '95%' }}>
                                <TabBar
                                    onSelectedTabChanged={setSelectedTabId}
                                    selectedTabId={selectedTabId}
                                    orientation={0}
                                    tabSize={TabSize.Compact} >
                                    <Tab name={CommonConstants.Tabs.Git.label} id={CommonConstants.Tabs.Git.id} iconProps={{ iconName: CommonConstants.Tabs.Git.iconName }} />
                                    <Tab name={CommonConstants.Tabs.ServiceEndpoint.label} id={CommonConstants.Tabs.ServiceEndpoint.id} iconProps={{ iconName: CommonConstants.Tabs.ServiceEndpoint.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Environment.label} id={CommonConstants.Tabs.Environment.id} iconProps={{ iconName: CommonConstants.Tabs.Environment.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Library.label} id={CommonConstants.Tabs.Library.id} iconProps={{ iconName: CommonConstants.Tabs.Library.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Build.label} id={CommonConstants.Tabs.Build.id} iconProps={{ iconName: CommonConstants.Tabs.Build.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Release.label} id={CommonConstants.Tabs.Release.id} iconProps={{ iconName: CommonConstants.Tabs.Release.iconName }} />
                                </TabBar>
                            </TableCell>
                        </>
                    </TableRow>
                    <>
                        {
                            selectedTabId === CommonConstants.Tabs.Git.id &&
                            <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                                <TableCell style={{ width: '100%' }}>
                                    <TableFrame style={{ width: "100%", height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                                        <>
                                            {
                                                repositoryPermissionGrants.map((permission: IPermission, index: number) => {
                                                    return (
                                                        <TableRow key={index} className="ignore-cssnames">
                                                            <>
                                                                <TableCell style={{ width: 560 }}>
                                                                    <span>{permission.displayName}</span>
                                                                </TableCell>
                                                                <TableCell style={{ width: 100 }}>
                                                                    <Dropdown
                                                                        width={120}
                                                                        className="super-compact-dropdown"
                                                                        items={[Grant.Allow, Grant.Deny, Grant.NotSet]}
                                                                        placeholder={permission.grant}
                                                                        onSelect={(e, item) => {
                                                                            permission.grant = item.id as Grant;
                                                                            setRepositoryPermissionGrants([...repositoryPermissionGrants])
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </>
                                                        </TableRow>
                                                    );
                                                })
                                            }
                                        </>
                                    </TableFrame>
                                </TableCell>
                            </TableRow>
                        }
                    </>
                    <>
                        {
                            selectedTabId === CommonConstants.Tabs.ServiceEndpoint.id &&
                            <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                                <TableCell style={{ width: '100%' }}>
                                    <TableFrame style={{ width: "100%", height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                                        <>
                                        <TableRow className="ignore-cssnames">
                                            <>
                                                <TableCell style={{ width: 140 }}>
                                                    <span>Service Connection Role</span>
                                                </TableCell>
                                                <TableCell style={{ width: '200px' }}>
                                                    <Dropdown                                                        
                                                        className="compact-dropdown"
                                                        items={ServiceEndpointRoles.map((role) => { return { id: role.identifier, text: role.displayName } })}
                                                        placeholder={serviceEndpointRole.displayName}
                                                        onSelect={(e, item) => {                                                            
                                                            const role = ServiceEndpointRoles.find((role) => role.displayName === item.text);
                                                            if (role != null) {
                                                                setServiceEndpointRole(role);
                                                            }
                                                        }}
                                                    />
                                                </TableCell>
                                            </>
                                        </TableRow>
                                        <TableRow className="ignore-cssnames">
                                            <>
                                                <TableCell style={{ width: 140 }}><span>&nbsp;</span></TableCell>
                                                <TableCell style={{ width: '600px' }}>
                                                    <span>{serviceEndpointRole.description}</span>
                                                </TableCell>
                                            </>
                                        </TableRow>                                        
                                        </>                                        
                                    </TableFrame>
                                </TableCell>
                            </TableRow>
                        }
                    </>
                    <>
                        {
                            selectedTabId === CommonConstants.Tabs.Environment.id &&
                            <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                                <TableCell style={{ width: '100%' }}>
                                    <TableFrame style={{ width: "100%", height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                                        <>
                                        <TableRow className="ignore-cssnames">
                                            <>
                                                <TableCell style={{ width: 140 }}>
                                                    <span>Environment Role</span>
                                                </TableCell>
                                                <TableCell style={{ width: '200px' }}>
                                                    <Dropdown                                                        
                                                        className="compact-dropdown"
                                                        items={EnvironmentRoles.map((role) => { return { id: role.identifier, text: role.displayName } })}
                                                        placeholder={environmentRole.displayName}
                                                        onSelect={(e, item) => {                                                            
                                                            const role = EnvironmentRoles.find((role) => role.displayName === item.text);
                                                            if (role != null) {
                                                                setEnvironmentRole(role);
                                                            }
                                                        }}
                                                    />
                                                </TableCell>
                                            </>
                                        </TableRow>
                                        <TableRow className="ignore-cssnames">
                                            <>
                                                <TableCell style={{ width: 140 }}><span>&nbsp;</span></TableCell>
                                                <TableCell style={{ width: '600px' }}>
                                                    <span>{environmentRole.description}</span>
                                                </TableCell>
                                            </>
                                        </TableRow>                                        
                                        </>                                        
                                    </TableFrame>
                                </TableCell>
                            </TableRow>
                        }
                    </>

                    <>
                        {
                            selectedTabId === CommonConstants.Tabs.Library.id &&
                            <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                                <TableCell style={{ width: '100%' }}>
                                    <TableFrame style={{ width: "100%", height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                                        <>
                                        <TableRow className="ignore-cssnames">
                                            <>
                                                <TableCell style={{ width: 140 }}>
                                                    <span>Library Role</span>
                                                </TableCell>
                                                <TableCell style={{ width: '200px' }}>
                                                    <Dropdown                                                        
                                                        className="compact-dropdown"
                                                        items={LibraryRoles.map((role) => { return { id: role.identifier, text: role.displayName } })}
                                                        placeholder={libraryRole.displayName}
                                                        onSelect={(e, item) => {                                                            
                                                            const role = LibraryRoles.find((role) => role.displayName === item.text);
                                                            if (role != null) {
                                                                setLibraryRole(role);
                                                            }
                                                        }}
                                                    />
                                                </TableCell>
                                            </>
                                        </TableRow>
                                        <TableRow className="ignore-cssnames">
                                            <>
                                                <TableCell style={{ width: 140 }}><span>&nbsp;</span></TableCell>
                                                <TableCell style={{ width: '600px' }}>
                                                    <span>{libraryRole.description}</span>
                                                </TableCell>
                                            </>
                                        </TableRow>                                        
                                        </>                                        
                                    </TableFrame>
                                </TableCell>
                            </TableRow>
                        }
                    </>                    

                    <>
                        {
                            selectedTabId === CommonConstants.Tabs.Build.id &&
                            <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                                <TableCell style={{ width: '100%' }}>
                                    <TableFrame style={{ width: "100%", height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                                        <>
                                            {
                                                buildPermissionGrants.map((permission: IPermission, index: number) => {
                                                    return (
                                                        <TableRow key={index} className="ignore-cssnames">
                                                            <>
                                                                <TableCell style={{ width: 560 }}>
                                                                    <span>{permission.displayName}</span>
                                                                </TableCell>
                                                                <TableCell style={{ width: 100 }}>
                                                                    <Dropdown
                                                                        width={120}
                                                                        className="super-compact-dropdown"
                                                                        items={[Grant.Allow, Grant.Deny, Grant.NotSet]}
                                                                        placeholder={permission.grant}
                                                                        onSelect={(e, item) => {
                                                                            permission.grant = item.id as Grant;
                                                                            setBuildPermissionGrants([...buildPermissionGrants])
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </>
                                                        </TableRow>
                                                    );
                                                })
                                            }
                                        </>
                                    </TableFrame>
                                </TableCell>
                            </TableRow>
                        }
                    </>

                    <>
                        {
                            selectedTabId === CommonConstants.Tabs.Release.id &&
                            <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                                <TableCell style={{ width: '100%' }}>
                                    <TableFrame style={{ width: "100%", height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                                        <>
                                            {
                                                releasePermissionGrants.map((permission: IPermission, index: number) => {
                                                    return (
                                                        <TableRow key={index} className="ignore-cssnames">
                                                            <>
                                                                <TableCell style={{ width: 560 }}>
                                                                    <span>{permission.displayName}</span>
                                                                </TableCell>
                                                                <TableCell style={{ width: 100 }}>
                                                                    <Dropdown
                                                                        width={120}
                                                                        className="super-compact-dropdown"
                                                                        items={[Grant.Allow, Grant.Deny, Grant.NotSet]}
                                                                        placeholder={permission.grant}
                                                                        onSelect={(e, item) => {
                                                                            permission.grant = item.id as Grant;
                                                                            setReleasePermissionGrants([...releasePermissionGrants])
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </>
                                                        </TableRow>
                                                    );
                                                })
                                            }
                                        </>
                                    </TableFrame>
                                </TableCell>
                            </TableRow>
                        }
                    </>                    

                    <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                        <>
                            <TableCell style={{ width: '95%' }}>
                                <>{operationInProgress && <Spinner size={SpinnerSize.large} />}</>
                            </TableCell>
                        </>
                    </TableRow>
                </>
            </TableFrame>
        </Panel>
    );
}

export default NewCustomRoleDialog;
