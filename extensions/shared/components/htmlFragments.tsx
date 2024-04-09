
import * as React from "react";
import { Ago } from "azure-devops-ui/Ago";
import { AgoFormat } from "azure-devops-ui/Utilities/Date";
import {
    CustomHeader,
    HeaderDescription,
    HeaderTitle,
    HeaderTitleArea,
    HeaderTitleRow,
    TitleSize
} from "azure-devops-ui/Header";

export const TimeAgo = (props: { date: any }) => {
    var dt = new Date(props.date);
    return (
        <Ago date={dt} format={AgoFormat.Compact} />
    );
}

export const HorizontalChildContainer = (
    props: { 
        children: JSX.Element | JSX.Element[],
        style?: React.CSSProperties
    }) => {

    const divStyle = {};    
    if (props.style) {
        Object.assign(divStyle, props.style);
    }
    Object.assign(divStyle, {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    });
    return (
        <div style={divStyle}>
            {props.children}
        </div>
    );
}

export const PrivilegeGrantHeader = (props: { title: string | undefined, subTitle: string | undefined }) => {
    return (
        <CustomHeader className="bolt-header-with-commandbar">
            <HeaderTitleArea>
                <HeaderTitleRow>
                    <HeaderTitle className="flex-grow text-ellipsis" titleSize={TitleSize.Large}>
                        <span>{props.title}</span>
                    </HeaderTitle>
                </HeaderTitleRow>
                <HeaderDescription className="text-ellipsis">
                    <span>{props.subTitle}</span>
                </HeaderDescription>
            </HeaderTitleArea>
        </CustomHeader>
    );
}

export class PrivilegeForm extends React.Component<{ children: JSX.Element, style?: React.CSSProperties }, any> {
    constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
        return (
            <table style={this.props.style} className="bolt-table bolt-table-show-lines bolt-list body-m relative scroll-hidden">
                <tbody>{this.props.children}</tbody>
            </table>
        );
    }
}

/*
export const PrivilegeItem = (
    props:
        {
            description: string | undefined,
            grant: string,
            onGrantChange: (grant: string) => void
        }) => {
    const [selectedGrant, setSelectedGrant] = React.useState<string>(BuiltInGrants[0].text);

    React.useEffect(() => {
        let selectedGrant = BuiltInGrants.find((biGrant: any) => {
            return biGrant.id === props.grant;
        });
        if (selectedGrant) {
            setSelectedGrant(selectedGrant.text);
        }
    }, [props.grant]);


    return (
        <tr>
            <td>
                <label style={{ minWidth: 240 }} className="bolt-formitem-label" >{props.description}</label>
            </td>

            <td style={{ width : 100 }}>
                <Dropdown
                    width={100}
                    placeholder={selectedGrant}
                    items={BuiltInGrants}
                    onSelect={(event: any, item: any) => props.onGrantChange(item.id)}
                />
            </td>
        </tr>
    );
}*/

export interface ITableColumn {
    name: string;
    width?: number;
    style?: React.CSSProperties;
}

export const TableCell = (
    props: {
        children: JSX.Element,
        style?: React.CSSProperties,
        className?: string,
        colSpan?: number,
        innerDivStyle?: React.CSSProperties,
        title?: string
    }) => {
    const innerDivStyle = props.innerDivStyle ? props.innerDivStyle : { marginLeft: 10, paddingTop: 10 };
    return (
        <td title={props.title} colSpan={props.colSpan ? props.colSpan : 1} className={props.className} style={props.style}>
            <div className="flex-row h-scroll-hidden v-scroll-hidden">
                <div className="flex-column h-scroll-hidden v-scroll-hidden" style={innerDivStyle}>
                    {props.children}
                </div>
            </div>
        </td>
    );
}

export const TableRow = (
    props: {
        children: JSX.Element,
        style?: React.CSSProperties
        className?: string,
        selected?: boolean
    }) => {
    let defaultStyle = {

    }
    if (props.style) {
        defaultStyle = Object.assign(defaultStyle, props.style);
    }
    const getCls = () => {
        if (props.className) {
            return props.className;
        }        
        return props.selected === true ? "bolt-table-row bolt-list-row selected" : "bolt-table-row bolt-list-row";
    }
    return (
        <tr style={defaultStyle} className={getCls()}>
            {props.children}
        </tr>
    );
}

export const TableFrame = (
    props: {
        children: JSX.Element,
        style?: React.CSSProperties,
        columns: ITableColumn[],
        className?: string,
        hideHeaders?: boolean
    }) => {
    let defaultStyle = {
        width: "100%",
        height: "10px"
    }
    if (props.style) {
        defaultStyle = Object.assign(defaultStyle, props.style);
    }

    return (
        <table style={defaultStyle} className={`${props.className} bolt-table bolt-table-show-lines bolt-list body-m relative scroll-hidden`}>
            {
                props.hideHeaders !== true &&
                <thead>
                    <tr className="bolt-table-header-row">
                        {
                            props.columns.map(function (column: ITableColumn, index: number) {
                                let defaultColumnStyle = {
                                    width: column.width ? column.width : "auto"
                                }
                                if (column.style) {
                                    defaultColumnStyle = Object.assign(defaultColumnStyle, column.style);
                                }
                                return (
                                    <th key={`${index}`} className="bolt-table-header-cell" style={defaultColumnStyle}>
                                        <div className="bolt-table-header-cell-content flex-row scroll-hidden bolt-table-header-cell-text text-ellipsis body-s">
                                            <span>{column.name}</span>
                                        </div>
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
            }

            <tbody>{props.children}</tbody>
        </table>
    );
}
