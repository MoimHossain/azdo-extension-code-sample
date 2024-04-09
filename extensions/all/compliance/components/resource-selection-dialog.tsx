
import * as React from "react";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { ContentSize } from "azure-devops-ui/Callout";
import { Checkbox } from "azure-devops-ui/Checkbox";
import { Panel } from "azure-devops-ui/Panel";
import Backend from "../../../shared/services/backend";
import { Icon } from "azure-devops-ui/Icon";
import { TableFrame, TableRow, TableCell, TimeAgo, HorizontalChildContainer } from "../../../shared/components/htmlFragments";
import { IFolder, IGenericResource } from "../../../shared/schemas/schemas";

const ResourceSelectionDialog = (
    props: {
        title: string,
        description: string,
        resourceKind: string,
        folder: IFolder,
        onDismiss: () => void
    }) => {
    const [linkedItems, setLinkedItems] = React.useState<{ checked: boolean, resource: IGenericResource }[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const columns = [{ width: 30, name: " " }, { width: 30, name: " " }, { name: "Name" }]

    React.useEffect(() => {
        setTimeout(async () => {
            const resources = await Backend.getResourcesAsync(props.resourceKind);
            const items: { checked: boolean, resource: IGenericResource }[] = [];
            if (resources && resources.length > 0) {
                for (let i = 0; i < resources.length; i++) {
                    const resource = resources[i];
                    items.push({ checked: false, resource: resource });
                }
                setLinkedItems(items);
            }
        }, 1);
    }, []);

    const getSelectedItems = (): IGenericResource[] => {
        const items: IGenericResource[] = [];
        if (linkedItems && linkedItems.length > 0) {
            linkedItems.forEach((item: { checked: boolean, resource: IGenericResource }) => {
                if (item.checked) {
                    items.push(item.resource);
                }
            });
        }
        return items;
    }

    const getDialogButtons = (): any[] => {
        const items = [];
        items.push({ text: "Cancel", onClick: props.onDismiss });
        items.push({
            primary: true,
            disabled: loading === true,
            text: "Link", onClick: async () => {
                const selectedItems = getSelectedItems();
                if (selectedItems && selectedItems.length > 0) {
                    setLoading(true);                    
                    for (let i = 0; i < selectedItems.length; i++) {
                        const resource = selectedItems[i];
                        await Backend.associateResourceToFolder(props.folder.id, props.resourceKind, resource.id, resource.name);
                    }
                    setLoading(false);
                    props.onDismiss();
                }
            }
        });
        return items;
    }

    return (
        <Panel
            onDismiss={props.onDismiss}
            size={ContentSize.Large}
            footerButtonProps={getDialogButtons()}
            description={props.description}
            titleProps={{ text: props.title }} >
            <>
                {
                    linkedItems && linkedItems.length > 0 &&
                    <TableFrame columns={columns}>
                        <>
                            {
                                linkedItems.map((item: { checked: boolean, resource: IGenericResource }, index: number) => {
                                    return (
                                        <TableRow key={`${index}`} selected={item.checked}>
                                            <>
                                                <TableCell innerDivStyle={{ marginLeft: 4, paddingTop: 6 }}>
                                                    <Checkbox
                                                        onChange={(event, checked) => {
                                                            item.checked = checked;
                                                            setLinkedItems([...linkedItems]);
                                                        }}
                                                        checked={item.checked}
                                                        label="Basic checkbox"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Icon iconName="GitLogo" />
                                                </TableCell>
                                                <TableCell>
                                                    <span>{item.resource.name}</span>
                                                </TableCell>
                                            </>
                                        </TableRow>
                                    );
                                })
                            }
                            {
                                loading === true &&
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <HorizontalChildContainer>
                                            <Spinner size={SpinnerSize.large} />
                                        </HorizontalChildContainer>
                                    </TableCell>
                                </TableRow>

                            }
                        </>
                    </TableFrame>
                }
            </>
        </Panel>
    );
}

export default ResourceSelectionDialog;