import * as React from "react";
import { Tree } from "azure-devops-ui/TreeEx";
import { ITreeItemEx } from "azure-devops-ui/Utilities/TreeItemProvider";
import { ITableItem } from "../../../shared/schemas/commonTypes";
import ColumnProvider from "../supports/column-provider";

import { TreeStructureProvider } from "../supports/structure-provider";
import { IFolder } from "../../../shared/schemas/schemas";


const TreeView = (
    props: {
        style?: React.CSSProperties,
        treeNodeProvider: TreeStructureProvider,
        readonly?: boolean,
        compact?: boolean,
        onFolderSelected: (folder: IFolder) => void,
        onNewChildFolderClicked: (folder: IFolder) => void,
        onModifyFolderClicked: (folder: IFolder) => void,
        onDeleteFolderClicked: (folder: IFolder) => void
    }) => {
        
    return (
        <Tree<ITableItem>
            columns={ColumnProvider(props)}
            itemProvider={props.treeNodeProvider.getNodeProvider()}           
            scrollable={true}
            onActivate={(event, treeRow: any) => {                                
                if(treeRow.data.underlyingItem.isBufferNode === true) {
                    return;
                }
                props.onFolderSelected(treeRow.data.underlyingItem.originalObjectRef);
            }}
            onToggle={async (event, treeItem: ITreeItemEx<ITableItem>) => {
                await props.treeNodeProvider.toggleAsync(treeItem);
            }}
        />
    );
}

export default TreeView;