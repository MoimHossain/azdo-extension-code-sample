
import * as React from "react";
import { ReactNode } from 'react';
import { VssPersona } from "azure-devops-ui/VssPersona";
import { Ago } from "azure-devops-ui/Ago";
import { AgoFormat } from "azure-devops-ui/Utilities/Date";
import { Animation } from '../../../shared/components/Animation';
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import {
    ColumnMore,
    ColumnSelect,
    ISimpleTableCell,
    renderSimpleCell,
    TableColumnLayout,
} from "azure-devops-ui/Table";
import { Images } from '../../../shared/components/Images';
import { Card } from "azure-devops-ui/Card";
import { Table } from "azure-devops-ui/Table";

interface IWorkItemViewerProps {
    workItems: any[];
}



export class WorkItemViewer extends React.Component<IWorkItemViewerProps, any> {
    private fixedColumns = [
        {
            id: "id",
            name: "ID",
            sourceField: "System.Id",
            readonly: true,
            renderCell: this.renderRegularCell.bind(this),
            width: 40,
        },
        {
            columnLayout: TableColumnLayout.singleLinePrefix,
            id: "title",
            name: "Title",
            readonly: true,
            renderCell: this.renderTitleCell.bind(this),
            width: new ObservableValue(-30),
        },
        {
            id: "state",
            name: "State",
            sourceField: "System.State",
            readonly: true,
            renderCell: this.renderRegularCell.bind(this),
            width: new ObservableValue(-30),
        },
        {
            columnLayout: TableColumnLayout.none,
            id: "assignedTo",
            sourceField: "System.AssignedTo",
            name: "Assigned To",
            readonly: true,
            renderCell: this.renderUserCell.bind(this),
            width: new ObservableValue(-40),
        },
    ];

    private workItemIcons = (new Images()).getAzureDevOpsWorkItemICon();


    constructor(props: any) {
        super(props);
    }

    private renderUserCell(
        rowIndex: number,
        columnIndex: number,
        tableColumn: any,
        tableItem: any) {
        var value = tableItem.fields[tableColumn.sourceField];
        if (value != null && value.displayName != null && value.imageUrl != null) {
            return (
                <td className="bolt-table-cell-compact bolt-table-cell bolt-list-cell bolt-table-spacer-cell">
                    <table><tr><td><VssPersona identityDetailsProvider={{
                        getDisplayName() {
                            return value.displayName;
                        },
                        getIdentityImageUrl(size: number) {
                            return value.imageUrl;
                        }
                    }}
                        size={"medium"} /></td><td>{value.displayName}</td></tr></table>
                </td>
            );
        }
        return (

            <td className="bolt-table-cell-compact bolt-table-cell bolt-list-cell bolt-table-spacer-cell">
                <span style={{ color: 'xx' }}><i>Unassigned</i></span>
            </td>
        );
    }

    private renderRegularCell(
        rowIndex: number,
        columnIndex: number,
        tableColumn: any,
        tableItem: any) {
        return (
            <td className="bolt-table-cell-compact bolt-table-cell bolt-list-cell bolt-table-spacer-cell">
                <span>{tableItem.fields[tableColumn.sourceField]}</span>
            </td>
        );
    }

    private renderTitleCell(
        rowIndex: number,
        columnIndex: number,
        tableColumn: any,
        tableItem: any) {
        var workItemType = tableItem.fields["System.WorkItemType"];
        var workItemIcon = this.workItemIcons.find((icon) => icon.type === workItemType);

        if(workItemIcon == null) {
            workItemIcon = this.workItemIcons[this.workItemIcons.length - 1];
        }

        return (
            <td className="bolt-table-cell-compact bolt-table-cell bolt-list-cell bolt-table-spacer-cell">
                <table onClick={() => {
                    window.open(tableItem.uri, '_blank');
                }} style={{ cursor: 'pointer' }}>
                    <tr>
                        <td><img src={workItemIcon.uri} style={{ marginTop: 10, width: 22, height: 22, border: 'none' }} /></td>
                        <td><span><b>{tableItem.fields["System.Title"]}</b></span></td>
                    </tr>
                </table>
            </td>
        );
    }

    public render(): JSX.Element {
        var COMPONENT = this;
        var workItems = COMPONENT.props.workItems || [];
        var tableItems = new ArrayItemProvider<any>(
            workItems.map((item: any) => {
                const newItem = Object.assign({}, item);
                return newItem;
            })
        );
        return (
            <React.Fragment>
                <Card
                    className="flex-grow bolt-table-card left-aligned-text"
                    contentProps={{ contentPadding: false }}>
                    <Table
                        columns={COMPONENT.fixedColumns}
                        itemProvider={tableItems}
                        role="table"
                        className="work-item-table"
                        containerClassName="h-scroll-auto"
                    />
                </Card>
            </React.Fragment>
        );
    }
}