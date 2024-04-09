import * as React from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { Panel } from "azure-devops-ui/Panel";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import CopilotService from "../services/backend";

export default class TeamProvision extends React.Component<any, any> {
    private copilotService = new CopilotService();
    constructor(props: any) {
        super(props);
        this.state = {
            teamName: this.props.teamName
        }
    }

    private async onTeamCreate() {
        var team = await this.copilotService.createTeam(this.state.teamName);
        this.props.onTeamCreated(team);
    }

    private getDialogCloseButtons() {
        const items = [];
        items.push({ text: "Cancel", onClick: this.props.onDialogCancel });
        if (this.state.teamName != null && this.state.teamName.length > 0) {
            items.push({ text: "Create", primary: true, onClick: this.onTeamCreate.bind(this) });
        }
        return items;
    }


    public render(): JSX.Element {
        return (
            <Panel
                onDismiss={this.props.onDialogCancel}
                footerButtonProps={this.getDialogCloseButtons()}
                description={`We will create a new team for you in this project`}
                titleProps={{ text: "New team" }}>

                <React.Fragment>
                    
                    <table
                        style={{ width: '100%', height: '100px' }}>
                        <tr style={{ height: 48 }}>

                            <td>Team Name</td>
                            <td>
                                <TextField
                                    value={this.state.teamName}
                                    onChange={(e, newValue) => {
                                        this.setState({ teamName: newValue })
                                    }}
                                    placeholder="Provide a name for the team"
                                    width={TextFieldWidth.standard}
                                />
                            </td>
                        </tr>

                    </table>

                </React.Fragment>
            </Panel >
        );
    }

    public async componentDidMount() {

    }

}

