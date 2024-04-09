
import { MenuItemType } from "azure-devops-ui/Menu";
import { ColumnMore } from "azure-devops-ui/Table";
import { BuiltInMenuIDs } from "../../../shared/schemas/common-constants";
import { IFolder, IFolderSecurity } from "../../../shared/schemas/schemas";

const ContextMenuProvider = (props:
    {
        readonly?: boolean,
        onNewChildFolderClicked: (folder: IFolder) => void,
        onModifyFolderClicked: (folder: IFolder) => void,
        onDeleteFolderClicked: (folder: IFolder) => void

    }) => {
    const isMenuAvailable = (listItem: any) => {          
        if(props.readonly === true) {
            return false;
        }
        if (listItem.underlyingItem.isBufferNode === true) {
            return false;
        }
        const folder = listItem.underlyingItem.originalObjectRef;
        if(folder && folder.security && folder.security.isAdmin === true) {
            return true;
        }
        return false;
    }
    const menuProvider = (listItem: any) => {
        const menuItems: any[] = [];
        menuItems.push({ id: BuiltInMenuIDs.NEW_SUB_FOLDER.id, text: BuiltInMenuIDs.NEW_SUB_FOLDER.label });
        menuItems.push({ id: BuiltInMenuIDs.MODIFY_FOLDER.id, text: BuiltInMenuIDs.MODIFY_FOLDER.label });
        menuItems.push({ id: BuiltInMenuIDs.DELETE_FOLDER.id, text: BuiltInMenuIDs.DELETE_FOLDER.label });
        // menuItems.push({ id: BuiltInMenuIDs.divider, itemType: MenuItemType.Divider });

        

        return {
            id: "sub-menu",
            onActivate: (menuItem: any, e: any) => {
                switch (menuItem.id) {
                    case BuiltInMenuIDs.NEW_SUB_FOLDER.id:
                        props.onNewChildFolderClicked(listItem.underlyingItem.originalObjectRef);
                        break;
                    case BuiltInMenuIDs.MODIFY_FOLDER.id:
                        props.onModifyFolderClicked(listItem.underlyingItem.originalObjectRef);
                        break;                        
                    case BuiltInMenuIDs.DELETE_FOLDER.id:
                        props.onDeleteFolderClicked(listItem.underlyingItem.originalObjectRef);
                        break;
                }
            },
            items: menuItems
        };
    };
    const moreColumn = new ColumnMore(menuProvider, isMenuAvailable);
    return moreColumn;
}
export default ContextMenuProvider;