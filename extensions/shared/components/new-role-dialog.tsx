import * as React from "react";
import { TableFrame, TableRow, TableCell, ITableColumn } from "./htmlFragments";
import { IRoleDefinition } from "../schemas/schemas";
import { CustomDialog } from "azure-devops-ui/Dialog";
import { Button } from "azure-devops-ui/Button";
import { CustomHeader, HeaderTitleArea } from "azure-devops-ui/Header";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { PanelContent, PanelFooter } from "azure-devops-ui/Panel";
import {
    IdentityPickerDropdown,
    IIdentity
} from "azure-devops-ui/IdentityPicker";
import { Dropdown } from "azure-devops-ui/Dropdown";
import GroupPicker from "./group-picker";

const NewRoleDialog = (
    props: {        
        roleDefinitions: IRoleDefinition[],
        onRoleAdd: (identity: IIdentity, roleDefinition: IRoleDefinition) => void,
        onClose: () => void
    }) => {
    const searchPromptText = "Search groups (min 3 chars)";
    const noGroupMatchedText = "No groups matched";
    const [identity, setIdentity] = React.useState<IIdentity>(null as any);
    const [dropdownItems, setDropdownItems] = React.useState<any[]>([]);
    const [saveButtonIsDisabled, setSaveButtonIsDisabled] = React.useState<boolean>(true);
    const [selectedRoleDefinition, setSelectedRoleDefinition] = React.useState<IRoleDefinition>(null as any);


    React.useEffect(() => {
        const dataIsValid = identity && selectedRoleDefinition;
        setSaveButtonIsDisabled(!dataIsValid);
    }, [identity, selectedRoleDefinition]);

    React.useEffect(() => {        
        const dropdownItems: any[] = [];
        props.roleDefinitions.forEach((roleDefinition) => {
            dropdownItems.push({
                id: roleDefinition.identifier,
                text: roleDefinition.name,
                underlyingRoleDefinition: roleDefinition
            });
        });
        setDropdownItems(dropdownItems);
    }, []);

    const selectIdentity = (identity?: IIdentity) => {
        if(identity) {
            setIdentity(identity);
        }

        // console.log("selectIdentity", identity);
        // setTimeout(async () => {
        //     console.log("selectIdentity", identity);
        //     if(identity) {
        //         if(!(identity.subjectDescriptor && identity.subjectDescriptor.length > 0)) {
        //             console.log("selectIdentity::materializeIdentity", identity);
        //             const materialziedIdentity = await IdentityV2Client.materializeIdentity(identity);                    

        //             console.log("selectIdentity::materializeIdentity::materialziedIdentity", materialziedIdentity);
        //             setIdentity(materialziedIdentity);
        //         }
        //         else {
        //             setIdentity(identity);
        //         }
        //     }
        // }, 1);
    }

    const onOkClicked = () => {
        console.log("onOkClicked", identity, selectedRoleDefinition);
        if(identity && selectedRoleDefinition) {
            props.onRoleAdd(identity, selectedRoleDefinition);
        }
    }

    console.log("NewRoleDialog::render", identity, selectedRoleDefinition);

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
                                        onChange={selectIdentity}                                        
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
                                            setSelectedRoleDefinition(item.underlyingRoleDefinition);
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
                                        onClick={onOkClicked}
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

export default NewRoleDialog;
