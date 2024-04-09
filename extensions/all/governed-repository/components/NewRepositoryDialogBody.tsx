
import * as React from "react";
import { Button } from "azure-devops-ui/Button";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { FormItem } from "azure-devops-ui/FormItem";
import { TableFrame, TableRow, TableCell, ITableColumn } from "../../../shared/components/htmlFragments";
import { TreeStructureProvider } from "../../compliance/supports/structure-provider";
import TreeView from "../../compliance/components/treeview";
import { IFolder } from "../../../shared/schemas/schemas";
import { Spinner } from "azure-devops-ui/Spinner";
import Backend from "../../../shared/services/backend";

const treeNodeProvider = new TreeStructureProvider();

const NewRepositoryDialogBody = (
    props: {
        onDismiss: () => void
    }) => {

    const [repositoryName, setRepositoryName] = React.useState<string>("");
    const [selectedFolder, setSelectedFolder] = React.useState<IFolder | undefined>(undefined);
    const [dataCompleted, setDataCompleted] = React.useState<boolean>(false);
    const [operationInProgress, setOperationInProgress] = React.useState<boolean>(false);

    const onComplete = async () => {
        if (selectedFolder !== undefined) {
            setOperationInProgress(true);
            await Backend.createRepositoryAsync(selectedFolder.id, repositoryName);
            props.onDismiss();
        }
    }

    React.useEffect(() => {
        setTimeout(async () => {
            await treeNodeProvider.realodAllAsync();
        }, 1);
    }, []);

    React.useEffect(() => {
        setDataCompleted(repositoryName.length > 0 && selectedFolder !== undefined);
    }, [repositoryName, selectedFolder]);

    return (
        <div className="flex-column flex-grow">
            <div className="flex-grow scroll-content">
                <TableFrame style={{ width: '100%', height: '100%', display: "flex" }} hideHeaders={true} columns={[]}>
                    <>
                        <TableRow className="ignore-cssnames">
                            <>
                                <TableCell style={{ width: '96%' }}>
                                    <FormItem label="Repository Name:">
                                        <TextField
                                            value={repositoryName}
                                            readOnly={false}
                                            spellCheck={false}
                                            required={true}
                                            onChange={(e, newValue) => { setRepositoryName(newValue); }}
                                            placeholder="Name"
                                            width={TextFieldWidth.standard}
                                        />
                                    </FormItem>
                                </TableCell>
                            </>
                        </TableRow>
                        <TableRow className="ignore-cssnames">
                            <>
                                <TableCell style={{ width: '96%' }}>
                                    <FormItem label="Belongs to:">
                                        <TextField
                                            value={selectedFolder ? selectedFolder.name : ""}
                                            disabled={true}
                                            readOnly={true}
                                            spellCheck={false}
                                            required={true}
                                            placeholder="Please select a folder below"
                                            width={TextFieldWidth.standard}
                                        />
                                    </FormItem>
                                </TableCell>
                            </>
                        </TableRow>
                        <TableRow className="ignore-cssnames">
                            <>
                                <TableCell style={{ width: '96%' }}>
                                    <>
                                        {
                                            operationInProgress ?
                                                <Spinner label="Processing request...Please wait" />
                                                :
                                                <TreeView
                                                    readonly={true}
                                                    compact={true}
                                                    treeNodeProvider={treeNodeProvider}
                                                    onNewChildFolderClicked={() => { }}
                                                    onModifyFolderClicked={() => { }}
                                                    onDeleteFolderClicked={() => { }}
                                                    onFolderSelected={setSelectedFolder} />
                                        }
                                    </>
                                </TableCell>
                            </>
                        </TableRow>
                    </>
                </TableFrame>
            </div>
            <ButtonGroup className="dialog-bottom-button-container">
                <Button
                    className="dialog-button"
                    text="Cancel"
                    onClick={props.onDismiss}
                />
                <Button
                    className="dialog-button"
                    primary={true}
                    disabled={!dataCompleted}
                    onClick={onComplete}
                    text="Complete"
                />
            </ButtonGroup>
        </div>
    );
}

export default NewRepositoryDialogBody;