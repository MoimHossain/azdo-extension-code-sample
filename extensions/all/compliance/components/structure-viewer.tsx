
import * as React from "react";
import { Button } from "azure-devops-ui/Button";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { TreeStructureProvider } from "../supports/structure-provider";
import { IFolder, IFolderSecurity } from "../../../shared/schemas/schemas";
import Backend from "../../../shared/services/backend";
import TreeView from "./treeview";

const StructureViewer = (
    props: {
        style?: React.CSSProperties,
        treeNodeProvider: TreeStructureProvider,
        onFolderSelected: (folder: IFolder) => void,
        onNewTopLevelFolderClicked: () => void,
        onNewChildFolderClicked: (folder: IFolder) => void,
        onModifyFolderClicked: (folder: IFolder) => void,
        onDeleteFolderClicked: (folder: IFolder) => void
    }) => {
    const [rootFolderSecurity, setRootFolderSecurity] = React.useState<IFolderSecurity | undefined>(undefined);

    React.useEffect(() => {
        setTimeout(async () => {
            const projectId = await Backend.getProjectId();
            const rootFolderSecurity = await Backend.evaluateFolderPermission(projectId);            
            setRootFolderSecurity(rootFolderSecurity);            
        }, 1);
    }, []);

    const checkIfUserIsAdmin = (): boolean => {
        if(rootFolderSecurity) {
            if(rootFolderSecurity.isAdmin === true) {
                return true;
            }
        }
        return false;
    }

    const getCommandBarItems = (): IHeaderCommandBarItem[] => {
        const items: any[] = [{
            id: "refresh",
            text: "Refresh",
            onActivate: () => {
                setTimeout(async () => {
                    await props.treeNodeProvider.realodAllAsync();
                }, 1);
            },
            iconProps: {
                iconName: "Refresh"
            }
        }];
        
        if(checkIfUserIsAdmin()) {
            items.push({
                id: "panel",
                text: "New",
                onActivate: props.onNewTopLevelFolderClicked,
                iconProps: {
                    iconName: 'Add'
                },
                isPrimary: true,
                tooltipProps: {
                    text: "Create a top-level node"
                }
            });
        }
        return items;
    }

    return (
        <div style={props.style}>
            <Page className="flex-grow">
                <Header title="Asset Governance structure"
                    commandBarItems={getCommandBarItems()}
                    description={"Manage Azure DevOps assets in a structured way at scale"}
                    titleSize={TitleSize.Large} />
                <div className="page-content page-content-top flex-column rhythm-vertical-16">
                    <Card
                        className="flex-grow bolt-card-no-vertical-padding bolt-table-card"
                        contentProps={{ contentPadding: false }} >
                        <TreeView {...props} />
                    </Card>
                </div>
            </Page>
        </div>
    );
}
export default StructureViewer;

