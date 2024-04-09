
import * as React from "react";
import { ScrollableList, ListSelection, ListItem } from "azure-devops-ui/List";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";


const LeftNavigationMenu = (
    props: {
        style?: React.CSSProperties,
        menuItems: { title: string, description: string }[],
        onSelected: (category: string) => void        
    }) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
    const [selection] = React.useState<ListSelection>(new ListSelection({
        selectOnFocus: true,
        multiSelect: false
    }));
    const getTitlesAsArray = () => {
        return props.menuItems.map((item) => item.title);
    }
    const [itemProvider] = React.useState<ArrayItemProvider<string>>(new ArrayItemProvider<string>(getTitlesAsArray()));

    React.useEffect(() => {
        setTimeout(() => {
            selection.select(selectedIndex);
            setSelectedIndex(selectedIndex);
            onSelect(selectedIndex, props.menuItems[selectedIndex].title);
        }, 1);
    }, []);

    const onSelect = (index: number, spec: string) => {
        if (props.onSelected != null) {
            setSelectedIndex(index);
            props.onSelected(spec);
        }
    }
    
    return (
        <div style={props.style}>
            <ScrollableList
                itemProvider={itemProvider}
                selection={selection}
                onSelect={(event, row: any) => onSelect(row.index, row.data)}
                width="100%"
                renderRow={(index: number, menuText: string, details: any) => {

                    return (
                        <ListItem
                            index={index}
                            details={details}
                            key={index}>
                            <div style={{
                                padding: "12px",
                                cursor: "pointer",
                                width: "100%",
                                justifyContent: "space-between"
                            }} className="flex-row h-scroll-hidden">
                                <div className="text-ellipsis">{selectedIndex === index ? <b>{menuText}</b> : menuText}</div>
                            </div>
                        </ListItem>
                    );
                }} />
        </div>
    );
}

export default LeftNavigationMenu;