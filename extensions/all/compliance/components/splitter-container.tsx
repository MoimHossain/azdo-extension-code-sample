
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { Dialog } from "azure-devops-ui/Dialog";
import StructureViewer from "./structure-viewer";
import FolderDetails from "./folder-details";
import { SplitterElementPosition, Splitter, SplitterDirection } from "azure-devops-ui/Splitter";
import { TreeStructureProvider } from "../supports/structure-provider";
import { IFolder } from "../../../shared/schemas/schemas";
import Backend from "../../../shared/services/backend";
import FolderDialog from "./folder-dialog";

const treeNodeProvider = new TreeStructureProvider();

const SplitterContainer = (
    props: {
        style?: React.CSSProperties
    }) => {
    const [collapsed, setCollapsed] = React.useState(false);    
    const [activeFolder, setActiveFolder] = React.useState<IFolder | undefined>(undefined);
    const [showNewTopLevelFolderDialog, setShowNewTopLevelFolderDialog] = React.useState(false);
    const [showNewChildFolderDialog, setShowNewChildFolderDialog] = React.useState(false);
    const [showModifyFolderDialog, setShowModifyFolderDialog] = React.useState(false);
    const [showDeleteFolderDialog, setShowDeleteFolderDialog] = React.useState(false);

    const deleteButtons = [{
        text: "Yes, Delete",
        onClick: async () => {            
            if (activeFolder) {
                const currentFolderId = activeFolder.id;
                const parentFolderId = activeFolder.parentFolderId;
                setShowDeleteFolderDialog(false);
                await Backend.deleteFolder(currentFolderId);
                await treeNodeProvider.realodAsync(parentFolderId);
                setActiveFolder(undefined);
            }
        },
        primary: true
    }, {
        text: "Cancel",
        onClick: () => setShowDeleteFolderDialog(false)
    }];

    React.useEffect(() => {
        setTimeout(async () => {
            await treeNodeProvider.realodAllAsync();
        }, 1);
    }, []);

    const isDialogOpen = () => {
        if (showNewTopLevelFolderDialog === true) return true;
        if (activeFolder) {
            if (showNewChildFolderDialog === true) return true;
            if (showModifyFolderDialog === true) return true;
        }
        return false;
    }

    return (
        <>
            {
                showDeleteFolderDialog && activeFolder && <Dialog
                                titleProps={{ text: "Confirm" }}
                                footerButtonProps={deleteButtons}
                                onDismiss={() => setShowDeleteFolderDialog(false)}>
                                <p>Are you sure you want to delete {activeFolder.name}?</p>                                
                            </Dialog>
            }
            {
                isDialogOpen() &&
                <FolderDialog
                    folder={activeFolder}
                    isTopLevel={showNewTopLevelFolderDialog}
                    isModifyMode={showModifyFolderDialog}
                    onDismiss={async (realodData?: boolean) => {
                        let folderIdToReload = undefined;
                        if(activeFolder) {
                            if(showModifyFolderDialog) {
                                folderIdToReload = activeFolder.parentFolderId;
                            } else {
                                folderIdToReload = activeFolder.id;                            
                            }
                        }
                        setShowModifyFolderDialog(false);
                        setShowNewChildFolderDialog(false);
                        setShowNewTopLevelFolderDialog(false);

                        if(folderIdToReload) {
                            await treeNodeProvider.realodAsync(folderIdToReload);
                        } else {
                            await treeNodeProvider.realodAllAsync();
                        }
                    }} />
            }
            <Splitter
                collapsed={collapsed}
                fixedElement={SplitterElementPosition.Far}
                splitterDirection={SplitterDirection.Vertical}
                initialFixedSize={900}
                minFixedSize={500}
                nearElementClassName="v-scroll-auto custom-scrollbar"
                farElementClassName="v-scroll-auto custom-scrollbar"
                onCollapsedChanged={collapsed => {
                    setCollapsed(collapsed);
                }}
                onRenderNearElement={() => <StructureViewer
                    treeNodeProvider={treeNodeProvider}
                    onNewTopLevelFolderClicked={() => {
                        setActiveFolder(undefined);
                        setShowNewTopLevelFolderDialog(true);                    
                    }}
                    onNewChildFolderClicked={(folder) => {
                        setActiveFolder(folder);
                        setShowNewChildFolderDialog(true);
                    }}
                    onModifyFolderClicked={(folder) => {
                        setActiveFolder(folder);
                        setShowModifyFolderDialog(true);
                    }}
                    onDeleteFolderClicked={(folder) => {
                        setActiveFolder(folder);
                        setShowDeleteFolderDialog(true);
                    }}
                    onFolderSelected={setActiveFolder} />}
                onRenderFarElement={() => <FolderDetails folder={activeFolder} />}
            />
        </>
    );
}

export default SplitterContainer;