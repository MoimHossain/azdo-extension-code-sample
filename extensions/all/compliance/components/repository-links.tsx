
import * as React from "react";
import Backend from "../../../shared/services/backend";
import { IFolder, ILinkEntity, ResourceKind, IGenericResource } from "../../../shared/schemas/schemas";
import { Button } from "azure-devops-ui/Button";
import { TableFrame, TableRow, TableCell, TimeAgo, HorizontalChildContainer } from "../../../shared/components/htmlFragments";
import { VssPersona } from "azure-devops-ui/VssPersona";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { Icon } from "azure-devops-ui/Icon";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { Page } from "azure-devops-ui/Page";
import ResourceSelectionDialog from "./resource-selection-dialog";

const RepoLinksCard = (
    props: {
        style?: React.CSSProperties,
        folder: IFolder,
        readonly?: boolean
    }) => {
    const titleText = "Repository associations";
    const descriptionText = `Manage repositories that are associated to ${props.folder.name}`;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [links, setLinks] = React.useState<ILinkEntity[]>([]);
    const [associationDialogOpen, setAssociationDialogOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        setTimeout(async () => {
            await reloadLinks();
        }, 1);
    }, [props.folder]);

    const columns = [{ width: 30, name: " " }, { width: 240, name: "Name" }, { name: " Who" }, { name: "Associated" }, { widt: 40, name: " " }];
    const reloadLinks = async () => {
        setLoading(true);
        var links = await Backend.getLinkedReources(props.folder.id, ResourceKind.Repository);
        setLinks(links);
        setLoading(false);
    }

    const getCommandBarItems = (): IHeaderCommandBarItem[] => {
        const items: IHeaderCommandBarItem[] = [{
            id: "refresh",
            text: "Refresh",
            onActivate: () => {
                setTimeout(async () => {
                    await reloadLinks();
                }, 1);
            },
            iconProps: {
                iconName: "Refresh"
            }
        }];
        if (props.readonly !== true) {
            items.push({
                iconProps: {
                    iconName: "Add"
                },
                id: "createNewRecord",
                important: true,
                isPrimary: true,
                onActivate: () => setAssociationDialogOpen(true),
                text: "Associate",
                tooltipProps: {
                    text: "Associate a new repository"
                }
            });
        }
        return items;
    }

    const deleteLinkItem = async (link: ILinkEntity) => {
        setLoading(true);
        await Backend.removeLink(link.id);
        await reloadLinks();
    }

    return (
        <Page className="section-inside-page">
            <Header
                title={titleText}
                description={descriptionText}
                commandBarItems={getCommandBarItems()}
                titleSize={TitleSize.Medium}
                titleAriaLevel={3}
            />
            <>
                {
                    associationDialogOpen &&
                    <ResourceSelectionDialog
                        folder={props.folder}
                        title={titleText}
                        description={descriptionText}
                        resourceKind={ResourceKind.Repository}
                        onDismiss={() => setAssociationDialogOpen(false)} />
                }
                <TableFrame columns={columns}>
                    <>
                        {
                            loading === true &&
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <HorizontalChildContainer>
                                        <Spinner size={SpinnerSize.medium} />
                                        <span style={{ marginLeft: 10 }}>Loading...</span>
                                    </HorizontalChildContainer>
                                </TableCell>
                            </TableRow>

                        }
                        {
                            loading === false && links.length === 0 &&
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <HorizontalChildContainer>
                                        <span style={{ marginLeft: 10 }}>No repositories associated</span>
                                    </HorizontalChildContainer>
                                </TableCell>
                            </TableRow>
                        }
                        {
                            loading === false &&
                            links.map((link: ILinkEntity, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <>
                                            <TableCell style={{ width: 30 }}>
                                                <Icon iconName="GitLogo" />
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-ellipsis body-m">{link.resourceName}</span>
                                            </TableCell>
                                            <TableCell title={link.createdBy.displayName}>
                                                <VssPersona
                                                    size={"medium"}
                                                    identityDetailsProvider={{
                                                        getDisplayName() {
                                                            return link.createdBy.displayName;
                                                        },
                                                        getIdentityImageUrl(size: number) {
                                                            return link.createdBy.imageUrl;
                                                        }
                                                    }} />
                                            </TableCell>
                                            <TableCell>
                                                <TimeAgo date={link.lastModified} />
                                            </TableCell>
                                            <TableCell>
                                                <>
                                                {
                                                    props.readonly !== true &&
                                                    <Button
                                                        subtle={true}
                                                        iconProps={{ iconName: "Delete" }}
                                                        onClick={async () => await deleteLinkItem(link)}
                                                        ariaLabel="Delete"
                                                        tooltipProps={{ text: "Delete" }}
                                                    />                                                    
                                                }
                                                </>
                                            </TableCell>
                                        </>
                                    </TableRow>
                                );
                            })
                        }
                    </>
                </TableFrame>
            </>
        </Page>
    );
}

export default RepoLinksCard;