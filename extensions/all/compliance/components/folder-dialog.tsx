
import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { IFolder } from "../../../shared/schemas/schemas";
import { ContentSize } from "azure-devops-ui/Callout";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { FormItem } from "azure-devops-ui/FormItem";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { BuiltInKinds } from "../../../shared/schemas/common-constants";
import { TableFrame, TableRow, TableCell, ITableColumn } from "../../../shared/components/htmlFragments";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import RoleConfigPanel from "../../../shared/components/role-config-panel";
import { IRoleDescriptor, IRoleDefinition } from "../../../shared/schemas/schemas";
import Backend from "../../../shared/services/backend";

const getDialogDescription = (
    props: {
        folder?: IFolder | undefined,
        isTopLevel: boolean,
        isModifyMode: boolean
    }) => {
    if (props.isTopLevel === true) return `Create top level node`;
    if (!props.folder) return '';

    if (props.isModifyMode === true) return `Modify ${props.folder.name} (${props.folder.path})`;
    return `Create child of ${props.folder.name} (${props.folder.path})`;
}
const getDialogTitle = (
    props: {
        folder?: IFolder | undefined,
        isTopLevel: boolean,
        isModifyMode: boolean
    }) => {
    if (props.isTopLevel === true) return `New`;
    if (!props.folder) return '';
    if (props.isModifyMode === true && props.folder) return `Modify ${props.folder.name}`;
    return `New child of ${props.folder.name}`;
}

const getDefaultValues = (
    props: {
        folder?: IFolder | undefined, 
        isModifyMode: boolean, 
        isTopLevel: boolean
    }) : {
        folderName: string,
        kind: string,
        ciNumber: string,
        description: string
     } => {
    const result = {
        folderName: "",
        kind: BuiltInKinds.AREA,
        ciNumber: "",
        description: ""

    };
    if(props.isModifyMode === true && props.folder) {
        result.folderName = props.folder.name;
        result.kind = props.folder.kind;
        result.ciNumber = props.folder.ciNumber;
        result.description = props.folder.description;
    }
    return result;
}


const FolderDialog = (
    props: {
        style?: React.CSSProperties,
        folder?: IFolder | undefined,
        isModifyMode: boolean,
        isTopLevel: boolean,
        onDismiss: (reloadData?: boolean) => void
    }) => {

    const [operationInProgress, setOperationInProgress] = React.useState<boolean>(false);

    const [folderName, setFolderName] = React.useState<string>(getDefaultValues(props).folderName);
    const [kind, setKind] = React.useState<string>(getDefaultValues(props).kind);
    const [ciNumber, setCiNumber] = React.useState<string>(getDefaultValues(props).ciNumber);
    const [description, setDescription] = React.useState<string>(getDefaultValues(props).description);
    const [supportedKinds, setSupportedKinds] = React.useState<string[]>([]);

    const [roleDefinitions, setRoleDefinitions] = React.useState<IRoleDefinition[]>([]);
    const [folderSecurity, setFolderSecurity] = React.useState<IRoleDescriptor[]>([]);

    const updateFolderSecurity = async (folderId: string) => {
        await Backend.setFolderSecurity(folderId, folderSecurity);
    }

    React.useEffect(() => {
        setOperationInProgress(true);
        setTimeout(async () => {
            const roleDefinitions = await Backend.getFolderRoleDefinitions();
            setRoleDefinitions(roleDefinitions);
            if(props.folder) {
                const folderSecurity = await Backend.getFolderSecurity(props.folder.id);            
                setFolderSecurity(folderSecurity);                
            } 
            if(!props.folder && props.isTopLevel === true) {
                var projectId = await Backend.getProjectId();
                const folderSecurity = await Backend.getFolderSecurity(projectId);            
                setFolderSecurity(folderSecurity);                
            }           
            setOperationInProgress(false);
        }, 1);
    }, [props.folder]);

    React.useEffect(() => {
        setSupportedKinds(BuiltInKinds.supportedKinds);
    }, []);

    const createTopLevelFolder = async () => {
        const user = await Backend.getCurrentUser();
        const payload = {
            name: folderName,
            kind: kind,
            description: description,
            ciNumber: ciNumber,
            createdBy: user,
        };
        const updatedFolder = await Backend.createTopLevelFolder(payload);
        await updateFolderSecurity(updatedFolder.id);
    }

    const createChildFolder = async () => {
        if(props.folder) {
            const parrentFolderId = props.folder.id;
            const user = await Backend.getCurrentUser();
            const payload = {
                name: folderName,
                kind: kind,
                description: description,
                ciNumber: ciNumber,
                createdBy: user,
            };
            var updatedFolder = await Backend.createChildFolder(parrentFolderId, payload);
            await updateFolderSecurity(updatedFolder.id);
        }
    }

    const modifyFolder = async () => {
        if(props.folder) {
            const user = await Backend.getCurrentUser();
            const payload = {
                name: folderName,
                kind: kind,
                description: description,
                ciNumber: ciNumber,
                lastModifiedBy: user,
            };
            await Backend.modifyFolder(props.folder.id, payload);
            await updateFolderSecurity(props.folder.id);
        }        
    }

    const applyAction = async () => {
        setOperationInProgress(true);
        if(props.isTopLevel === true) {
            await createTopLevelFolder();
            setOperationInProgress(false);
            props.onDismiss(true);
        }
        if(props.isTopLevel === false && props.folder && props.isModifyMode === false) {
            await createChildFolder();
            setOperationInProgress(false);
            props.onDismiss(true);
        }
        if(props.isModifyMode === true && props.folder) {
            await modifyFolder();
            setOperationInProgress(false);
            props.onDismiss(true);
        }
    }

    const getDialogButtons = (): any[] => {
        const items = [];
        items.push({ text: "Cancel", onClick: props.onDismiss });
        items.push({
            primary: true,
            disabled: operationInProgress === true || folderName.length === 0 || folderSecurity.length === 0,
            text: props.isModifyMode === true ? "Modify" : "Create",
            onClick: async () => {                
                await applyAction();                
            }
        });
        return items;
    }

    const onRoleDeleted = async (index: number, spec: IRoleDescriptor) => {        
        const newSpecs = [...folderSecurity];
        newSpecs.splice(index, 1);        
        setFolderSecurity(newSpecs);
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
            setFolderSecurity(newSpecs);
        }
    }

    return (
        <Panel
            onDismiss={props.onDismiss}
            size={ContentSize.Auto}
            footerButtonProps={getDialogButtons()}
            description={getDialogDescription(props)}
            titleProps={{ text: getDialogTitle(props) }} >

            <TableFrame style={{ width: 800, height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                <>
                    <TableRow className="ignore-cssnames">
                        <>
                            <TableCell style={{ width: '50%' }}>
                                <FormItem label="Name:">
                                    <TextField
                                        value={folderName}
                                        readOnly={false}
                                        spellCheck={false}
                                        required={true}
                                        onChange={(e, newValue) => { setFolderName(newValue); }}
                                        placeholder="Name"
                                        width={TextFieldWidth.standard}
                                    />
                                </FormItem>
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                                <FormItem label="Kind:">
                                    <Dropdown
                                        className="compact-dropdown"
                                        placeholder={kind}
                                        items={supportedKinds}
                                        onSelect={(event: any, item: any) => {
                                            setKind(item.text);
                                        }}
                                    />
                                </FormItem>
                            </TableCell>
                        </>
                    </TableRow>
                    <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                        <>
                            <TableCell style={{ width: '95%' }}>
                                <FormItem label="Description:">
                                    <TextField
                                        value={description}
                                        readOnly={false}
                                        spellCheck={false}
                                        required={true}
                                        multiline
                                        rows={4}
                                        onChange={(e, newValue) => { setDescription(newValue); }}
                                        placeholder="Description"
                                        width={TextFieldWidth.standard}
                                    />
                                </FormItem>
                            </TableCell>
                            <TableCell style={{ width: '95%' }}>
                                <FormItem label="CI Number:">
                                    <TextField
                                        value={ciNumber}
                                        readOnly={false}
                                        spellCheck={false}
                                        required={true}
                                        onChange={(e, newValue) => { setCiNumber(newValue); }}
                                        placeholder="CI Number"
                                        width={TextFieldWidth.standard}
                                    />
                                </FormItem>
                            </TableCell>
                        </>
                    </TableRow>
                    <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                        <TableCell colSpan={2}  style={{ width: '90%' }}>
                            <RoleConfigPanel
                                readonly={false}
                                showProgressInsteadOfRows={operationInProgress}
                                header="Folder security"
                                description="Configure roles for this folder"
                                roleDefinitions={roleDefinitions}
                                onNewRoleAdded={onNewRoleAdded}
                                onRoleDeleted={onRoleDeleted}
                                specifications={folderSecurity} />
                        </TableCell>
                    </TableRow>
                    <TableRow className="ignore-cssnames" style={{ verticalAlign: 'top' }} >
                        <>
                            <TableCell style={{ width: '95%' }}>
                                <>{ operationInProgress && <Spinner size={SpinnerSize.large} /> }</>
                            </TableCell>
                        </>
                    </TableRow>                    
                </>
            </TableFrame>
        </Panel>
    );
}

export default FolderDialog;