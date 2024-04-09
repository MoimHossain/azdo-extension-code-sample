
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { Card } from "azure-devops-ui/Card";
import { Page } from "azure-devops-ui/Page";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IFolder, ResourceKind } from "../../../shared/schemas/schemas";
import { Tab, TabBadge, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { CommonConstants } from "../../../shared/schemas/common-constants";
import Backend from "../../../shared/services/backend";
import BasicInfoCard from "./basic-info";
import SecurityTab from "./security-tab";
import ResourceAssociationPanel from "./resource-association";


const BadgeCountLabel = (props: { count: number }) => {
    return (
        <>
            {
                props.count > 0 && <TabBadge>{props.count}</TabBadge>
            }
        </>
    );
}

const FolderDetails = (
    props: {
        style?: React.CSSProperties,
        folder: IFolder | undefined
    }) => {
    const [readOnly, setReadOnly] = React.useState<boolean>(true);
    const [selectedTabId, setSelectedTabId] = React.useState<string>(CommonConstants.Tabs.General.id);
    const [linkedRepositoryCount, setLinkedRepositoryCount] = React.useState<number>(0);
    const hasValidFolder = props.folder !== undefined;
    const getPanelTitle = (): string => (hasValidFolder ? `${props.folder!.kind} - ${props.folder!.name}` : "No items selected");
    const getPanelDescription = (): string => (hasValidFolder ? props.folder!.description : "Please select an item from the left panel");

    React.useEffect(() => {
        if(props.folder) {
            setReadOnly(!(props.folder.security && props.folder.security.isAdmin === true));
            
            setTimeout(async () => {
                if(props.folder) {
                    var links = await Backend.getLinkedReources(props.folder.id, ResourceKind.Repository);
                    if(links) {
                        setLinkedRepositoryCount(links.length);
                    }
                }
            }, 1);
        }
    }, [props.folder]);

    const getCommandBarItems = (folder: IFolder | undefined): IHeaderCommandBarItem[] => {
        const items: IHeaderCommandBarItem[] = [];
        return items;
    }

    return (
        <Page className="flex-grow">
            <Header
                title={getPanelTitle()}
                commandBarItems={getCommandBarItems(props.folder)}
                description={getPanelDescription()}
                titleSize={TitleSize.Large} />
            <div className="page-content page-content-top flex-column rhythm-vertical-16">
                <Card
                    className="flex-grow bolt-card-no-vertical-padding bolt-table-card"
                    contentProps={{ contentPadding: false }} >
                    <>
                        {
                            hasValidFolder &&
                            <div className="flex-column">
                                <TabBar                                    
                                    onSelectedTabChanged={setSelectedTabId}
                                    orientation={0}
                                    selectedTabId={selectedTabId}
                                    tabSize={TabSize.Compact}
                                >

                                    <Tab name={CommonConstants.Tabs.General.label} id={CommonConstants.Tabs.General.id} iconProps={{ iconName: CommonConstants.Tabs.General.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Security.label} id={CommonConstants.Tabs.Security.id} iconProps={{ iconName: CommonConstants.Tabs.Security.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Git.label} id={CommonConstants.Tabs.Git.id} iconProps={{ iconName: CommonConstants.Tabs.Git.iconName }} renderBadge={() => <BadgeCountLabel count={linkedRepositoryCount} />}/>
                                    <Tab name={CommonConstants.Tabs.ServiceEndpoint.label} id={CommonConstants.Tabs.ServiceEndpoint.id} iconProps={{ iconName: CommonConstants.Tabs.ServiceEndpoint.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Environment.label} id={CommonConstants.Tabs.Environment.id} iconProps={{ iconName: CommonConstants.Tabs.Environment.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Library.label} id={CommonConstants.Tabs.Library.id} iconProps={{ iconName: CommonConstants.Tabs.Library.iconName }} />
                                    <Tab name={CommonConstants.Tabs.Pipeline.label} id={CommonConstants.Tabs.Pipeline.id} iconProps={{ iconName: CommonConstants.Tabs.Pipeline.iconName }} />
                                </TabBar>


                                <div className="page-content page-content-top">
                                    { selectedTabId === CommonConstants.Tabs.General.id && <BasicInfoCard folder={props.folder!} readonly={readOnly} /> }
                                    { selectedTabId === CommonConstants.Tabs.Security.id && <SecurityTab folder={props.folder!} readonly={readOnly} /> }
                                    { selectedTabId === CommonConstants.Tabs.Git.id && <ResourceAssociationPanel folder={props.folder!} resourceKind={ResourceKind.Repository} iconName={CommonConstants.Tabs.Git.iconName} readonly={readOnly} /> }
                                    { selectedTabId === CommonConstants.Tabs.ServiceEndpoint.id && <ResourceAssociationPanel folder={props.folder!} resourceKind={ResourceKind.Endpoint} iconName={CommonConstants.Tabs.ServiceEndpoint.iconName} readonly={readOnly} /> }
                                    { selectedTabId === CommonConstants.Tabs.Environment.id && <ResourceAssociationPanel folder={props.folder!} resourceKind={ResourceKind.Environment} iconName={CommonConstants.Tabs.Environment.iconName} readonly={readOnly} /> }
                                    { selectedTabId === CommonConstants.Tabs.Library.id && <ResourceAssociationPanel folder={props.folder!} resourceKind={ResourceKind.Library} iconName={CommonConstants.Tabs.Library.iconName} readonly={readOnly} /> }
                                </div>
                            </div>
                        }
                        {
                            !hasValidFolder && <div>no folder selected</div>
                        }
                    </>
                </Card>
            </div>
        </Page>

    );
}

export default FolderDetails;
