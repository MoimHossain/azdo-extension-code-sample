import { ITreeColumn, ITreeRow, Tree } from "azure-devops-ui/TreeEx";
import { ITreeItemEx } from "azure-devops-ui/Utilities/TreeItemProvider";
import { renderExpandableTreeCell, renderTreeCell } from "azure-devops-ui/TreeEx";
import {
    ITreeItem,
    ITreeItemProvider,
    TreeItemProvider,
} from "azure-devops-ui/Utilities/TreeItemProvider";
import { ITableItem, RENDER } from "../../../shared/schemas/commonTypes";
import { IFolder } from "../../../shared/schemas/schemas";

import Backend from "../../../shared/services/backend";

const BUFFER_NODE = {
    data: {
        details: { text: "Loading", iconProps: { render: RENDER.folder } }
    },
    isBufferNode: true,
    childItems: undefined,
    expanded: true
} as any;

export class TreeStructureProvider  {
    private _treeItemProvider: ITreeItemProvider<ITableItem>;

    constructor() {
        this._treeItemProvider = new TreeItemProvider<ITableItem>([]);
    }

    findNodeByFolderId = (nodes: any, folderId: string): any | undefined => {        
        if(nodes && nodes.length > 0    ) {
            for(let i = 0; i < nodes.length; i++) {
                const treeNode = (nodes[i] as any);
                
                if(treeNode.originalObjectRef.id === folderId) {                    
                    return treeNode;
                }
                const foundNode = this.findNodeByFolderId(treeNode.childItems, folderId);
                if(foundNode) {
                    return foundNode;
                }
            }
        }
        return undefined;
    }

    realodAsync = async (folderId: string | undefined) => {
        if(folderId && folderId.length > 0) { 
            const underlyingItem = this.findNodeByFolderId(this._treeItemProvider.roots, folderId);            
            if(underlyingItem) {
                if(underlyingItem.childItems) {
                    const tempChildItems = [];
                    // NOTE: make sure you delete by creating a copy of the array
                    // Otherwise, the childItems array will be modified and the loop will not work
                    for(let i = 0; i < underlyingItem.childItems.length; i++) {
                        const childItem = (underlyingItem.childItems[i] as any);
                        tempChildItems.push(childItem);
                    }
                    for(let i = 0; i < tempChildItems.length; i++) {                        
                        this._treeItemProvider.remove(tempChildItems[i], underlyingItem);
                    }
                }
                underlyingItem.childrenLoaded = false;
                underlyingItem.expanded = false;
                await this.loadChildNodesAsync(underlyingItem);
                return;
            }
        }
        // if there is no match then reload the entire tree
        await this.realodAllAsync();
    }
    
    toggleAsync = async (node: ITreeItemEx<ITableItem>) => {
        const treeNode = (node as any);        
        const underlyingItem = treeNode.underlyingItem;
        if(underlyingItem.expanded === false) {     
            const folder = underlyingItem.originalObjectRef as IFolder;            
            if(folder.hasChildren === true && underlyingItem.childrenLoaded !== true) {
                await this.loadChildNodesAsync(underlyingItem);
                return;
            }
        }
        this._treeItemProvider.toggle(underlyingItem);
    }

    loadChildNodesAsync = async (underlyingItem: any) => {
        if(underlyingItem.childrenBeingLoaded === true) {
            return;
        }
        underlyingItem.childrenBeingLoaded = true;                
        this._treeItemProvider.add(BUFFER_NODE, underlyingItem);

        underlyingItem.expanded = false;
        this._treeItemProvider.toggle(underlyingItem);
        var childFolders = await Backend.getChildFolders(underlyingItem.originalObjectRef.id);
        underlyingItem.childrenLoaded = true;
        underlyingItem.childrenBeingLoaded = false;
        this._treeItemProvider.remove(BUFFER_NODE, underlyingItem);

        let lastInsertedNode: any = undefined;
        for(let i = 0; i < childFolders.length; i++) {
            const childFolder = childFolders[i];
            const childNode = this.createNode(childFolder);
            this._treeItemProvider.add(childNode, underlyingItem, lastInsertedNode);
            lastInsertedNode = childNode;
        }
    }
    
    realodAllAsync = async () => {
        this._treeItemProvider.clear();
        this._treeItemProvider.add(BUFFER_NODE);
        var rootFolders = await Backend.getRootFolders();        
        this._treeItemProvider.remove(BUFFER_NODE);
        
        if (rootFolders && rootFolders.length > 0) {
            const parentNode = undefined; // The parent should be undefined for root nodes
            let lastInsertedNode: any = undefined;

            rootFolders.forEach((rootFolder: IFolder) => {
                let rootNode = this.createNode(rootFolder);
                this._treeItemProvider.add(rootNode, parentNode, lastInsertedNode);
                lastInsertedNode = rootNode;
            });
        }
    }

    getNodeProvider = (): ITreeItemProvider<ITableItem> => {
        return this._treeItemProvider;
    }

    createNode = (folder: IFolder): ITreeItem<ITableItem> => {
        return {
            data: {
                details: { text: folder.name, iconProps: { render: RENDER.getFolderRenderer(folder) } }
            },
            originalObjectRef: folder,
            childItems: folder.hasChildren === true ? [] : undefined,
            expanded: folder.hasChildren === true ? false : true
        } as any;
    }
}
