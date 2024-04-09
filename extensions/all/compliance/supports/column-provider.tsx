import * as React from "react";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { ITreeColumn, ITreeRow, Tree } from "azure-devops-ui/TreeEx";
import { renderExpandableTreeCell, renderTreeCell } from "azure-devops-ui/TreeEx";
import { ITableItem } from "../../../shared/schemas/commonTypes";
import { TimeAgo } from "../../../shared/components/htmlFragments";
import { VssPersona } from "azure-devops-ui/VssPersona";
import ContextMenuProvider from "./column-menu-provider";
import { IFolder } from "../../../shared/schemas/schemas";


const nameColumn = {
    id: "details",
    name: "Name",
    renderCell: (rowIndex: number, columnIndex: number, treeColumn: any, treeItem: any) => {
        if (treeItem.underlyingItem.isBufferNode === true) {
            return (
                <td key={`${rowIndex}${columnIndex}`} className="bolt-tree-cell bolt-table-cell bolt-list-cell">
                    <div className="bolt-table-cell-content flex-row flex-center">
                        <div className="flex-row" style={{ marginLeft: (30 + (treeColumn.indentationSize * treeItem.depth)) }}>
                            <Spinner size={SpinnerSize.medium} />
                            <div style={{ marginLeft: 4 }} />
                            <span className="text-ellipsis body-m">
                                {treeItem.underlyingItem.data.details.text}
                            </span>
                        </div>
                    </div>
                </td>
            );
        }
        return renderExpandableTreeCell(rowIndex, columnIndex, treeColumn, treeItem);

    },
    width: 300,
    minWidth: 400,
    indentationSize: 16,
    hierarchical: true
};

const kindColumn = {
    id: "kind",
    minWidth: 80,
    name: "Kind",
    renderCell: (rowIndex: number, columnIndex: number, treeColumn: any, treeItem: any) => {
        if (treeItem.underlyingItem.isBufferNode === true) {
            return (
                <td key={`${rowIndex}${columnIndex}`} className="bolt-tree-cell bolt-table-cell bolt-list-cell">
                    <div className="bolt-table-cell-content flex-row flex-center">
                        <span className="bolt-list-cell-child flex-row flex-center bolt-list-cell-text">
                            &nbsp;
                        </span>
                    </div>
                </td>
            );
        }
        return (
            <td key={`${rowIndex}${columnIndex}`} className="bolt-tree-cell bolt-table-cell bolt-list-cell">
                <div className="bolt-table-cell-content flex-row flex-center">
                    <span className="bolt-list-cell-child flex-row flex-center bolt-list-cell-text">
                        <span className="text-ellipsis body-m">
                            {treeItem.underlyingItem.originalObjectRef.kind}
                        </span>
                    </span>
                </div>
            </td>
        )
    },
    width: -100,
};

const lastModifiedColumn = {
    id: "lastModified",
    minWidth: 80,
    name: "Last Modified",
    renderCell: (rowIndex: number, columnIndex: number, treeColumn: any, treeItem: any) => {
        if (treeItem.underlyingItem.isBufferNode === true) {
            return (
                <td key={`${rowIndex}${columnIndex}`} className="bolt-tree-cell bolt-table-cell bolt-list-cell">
                    <div className="bolt-table-cell-content flex-row flex-center">
                        <span className="bolt-list-cell-child flex-row flex-center bolt-list-cell-text">
                            &nbsp;
                        </span>
                    </div>
                </td>
            );
        }
        return (
            <td key={`${rowIndex}${columnIndex}`} className="bolt-tree-cell bolt-table-cell bolt-list-cell">
                <div className="bolt-table-cell-content flex-row flex-center">
                    <span className="bolt-list-cell-child flex-row flex-center bolt-list-cell-text">
                        <span className="text-ellipsis body-m">
                            <TimeAgo date={treeItem.underlyingItem.originalObjectRef.lastModified} />
                        </span>
                    </span>
                </div>
            </td>
        )
    },
    width: -100,
};

const lastModifiedByColumn = {
    id: "lastModifiedBy",
    minWidth: 60,
    name: "Modified By",
    renderCell: (rowIndex: number, columnIndex: number, treeColumn: any, treeItem: any) => {
        if (treeItem.underlyingItem.isBufferNode === true) {
            return (
                <td key={`${rowIndex}${columnIndex}`} className="bolt-tree-cell bolt-table-cell bolt-list-cell">
                    <div className="bolt-table-cell-content flex-row flex-center">
                        <span className="bolt-list-cell-child flex-row flex-center bolt-list-cell-text">
                            &nbsp;
                        </span>
                    </div>
                </td>
            );
        }
        return (
            <td key={`${rowIndex}${columnIndex}`} className="bolt-tree-cell bolt-table-cell bolt-list-cell">
                <div className="bolt-table-cell-content flex-row flex-center">
                    <span
                        title={treeItem.underlyingItem.originalObjectRef.lastModifiedBy.displayName}
                        className="bolt-list-cell-child flex-row flex-center bolt-list-cell-text">
                        <VssPersona
                            size={"medium"}
                            identityDetailsProvider={{
                                getDisplayName() {
                                    return treeItem.underlyingItem.originalObjectRef.lastModifiedBy.displayName;
                                },
                                getIdentityImageUrl(size: number) {
                                    return treeItem.underlyingItem.originalObjectRef.lastModifiedBy.imageUrl;
                                }
                            }} />
                        {/* <span className="text-ellipsis body-m">
                            {treeItem.underlyingItem.originalObjectRef.lastModifiedBy.displayName}
                        </span> */}
                    </span>
                </div>
            </td>
        )
    },
    width: -100,
};

export const ColumnProvider = (
    props: {
        readonly?: boolean,
        compact?: boolean,
        onNewChildFolderClicked: (folder: IFolder) => void,
        onModifyFolderClicked: (folder: IFolder) => void,
        onDeleteFolderClicked: (folder: IFolder) => void
    }): ITreeColumn<ITableItem>[] => {
    if (props.compact === true) {
        nameColumn.width = -100;
        return [nameColumn];
    }
    return [nameColumn, kindColumn/*, lastModifiedColumn, lastModifiedByColumn */, ContextMenuProvider(props)];
}

export default ColumnProvider;