import * as React from "react";
import { TableFrame, TableRow, TableCell, ITableColumn } from "./htmlFragments";
import { ICustomRole } from "../schemas/schemas";
import { CustomDialog } from "azure-devops-ui/Dialog";
import { Button } from "azure-devops-ui/Button";
import { CustomHeader, HeaderTitleArea } from "azure-devops-ui/Header";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { PanelContent, PanelFooter } from "azure-devops-ui/Panel";
import { IIdentity } from "azure-devops-ui/IdentityPicker";
import GroupPicker from "./group-picker";
import { Dropdown } from "azure-devops-ui/Dropdown";
import Backend from "../services/backend";


const CustomRolePicker = (
    props: {        
        onRoleAdd: (identity: IIdentity, role: ICustomRole) => void,
        onClose: () => void
    }) => {
    const searchPromptText = "Search groups (min 3 chars)";
    const noGroupMatchedText = "No groups matched";    
    const [identity, setIdentity] = React.useState<IIdentity>(null as any);
    const [dropdownItems, setDropdownItems] = React.useState<any[]>([]);
    const [saveButtonIsDisabled, setSaveButtonIsDisabled] = React.useState<boolean>(true);
    const [selectedRoleDefinition, setSelectedRoleDefinition] = React.useState<ICustomRole>(null as any);


    React.useEffect(() => {
        const dataIsValid = identity && selectedRoleDefinition;
        setSaveButtonIsDisabled(!dataIsValid);
    }, [identity, selectedRoleDefinition]);

    React.useEffect(() => {
        setTimeout(async () => {
            const dropdownItems: any[] = [];
            var customRoles = await Backend.getCustomRoles();
            customRoles.forEach((role: ICustomRole) => {
                dropdownItems.push({
                    id: role.id,
                    text: role.name,
                    underlyingCustomRole: role
                });
            });
            setDropdownItems(dropdownItems);            
        }, 1);
    }, []);

    return (
        <CustomDialog
            contentSize={2}
            onDismiss={props.onClose}
            modal={true}>
            <CustomHeader className="bolt-header-with-commandbar" separator>
                <HeaderTitleArea>
                    <div className="flex-grow scroll-hidden" style={{ marginRight: "16px" }}>
                        <div className="title-m" style={{ maxHeight: "32px" }}>
                            Add new role
                        </div>
                    </div>
                </HeaderTitleArea>
            </CustomHeader>
            <PanelContent>
                <TableFrame hideHeaders={true} columns={[]}>
                    <>
                        <TableRow>
                            <>
                                <TableCell style={{ width: 200 }}>
                                    <b>Group</b>
                                </TableCell>
                                <TableCell>
                                    <GroupPicker                                        
                                        onChange={(identity?: IIdentity) => setIdentity(identity || null as any)}                                        
                                        noResultsFoundText={noGroupMatchedText}
                                        editPlaceholder={searchPromptText}
                                        placeholder={searchPromptText}
                                        identity={identity}
                                    />
                                </TableCell>
                            </>
                        </TableRow>
                        <TableRow>
                            <>
                                <TableCell>
                                    <b>Role</b>
                                </TableCell>
                                <TableCell>
                                    <Dropdown
                                        className="role-dropdown"
                                        placeholder={"Select a role"}
                                        items={dropdownItems}
                                        onSelect={(event: any, item: any) => {
                                            setSelectedRoleDefinition(item.underlyingCustomRole);
                                        }}
                                    />
                                </TableCell>
                            </>
                        </TableRow>
                    </>
                </TableFrame>
            </PanelContent>
            <PanelFooter showSeparator className="body-m">
                <TableFrame hideHeaders={true} columns={[]}>
                    <TableRow>
                        <>
                            <TableCell style={{ width: 450 }}><span /></TableCell>
                            <TableCell>
                                <ButtonGroup className="flex-wrap">
                                    <Button
                                        text="Add"
                                        primary={true}
                                        disabled={saveButtonIsDisabled}
                                        onClick={() => {
                                            props.onRoleAdd(identity, selectedRoleDefinition);
                                            props.onClose();
                                        }}
                                    />
                                    <Button text="Cancel" onClick={props.onClose} />
                                </ButtonGroup>
                            </TableCell>
                        </>
                    </TableRow>
                </TableFrame>
            </PanelFooter>
        </CustomDialog>
    );
}

export default CustomRolePicker;
