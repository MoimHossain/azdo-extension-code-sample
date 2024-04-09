import * as React from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { Panel } from "azure-devops-ui/Panel";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import CopilotService from "../services/backend";

export default class RepoProvision extends React.Component<any, any> {
    private copilotService = new CopilotService();
    constructor(props: any) {
        super(props);
        this.state = {
            repoName: this.props.repoName
        }
    }

    private async onRepoCreate() {
        var repo = await this.copilotService.createRepository(this.state.repoName);
        this.props.onReporeated(repo);
    }

    private getDialogCloseButtons() {
        const items = [];
        items.push({ text: "Cancel", onClick: this.props.onDialogCancel });
        if (this.state.repoName != null && this.state.repoName.length > 0) {
            items.push({ text: "Create", primary: true, onClick: this.onRepoCreate.bind(this) });
        }
        return items;
    }


    public render(): JSX.Element {
        return (
            <Panel
                onDismiss={this.props.onDialogCancel}
                footerButtonProps={this.getDialogCloseButtons()}
                description={`We will create a new repository for you in this project`}
                titleProps={{ text: "New Repository" }}>

                <React.Fragment>
                    
                    <table
                        style={{ width: '100%', height: '100px' }}>
                        <tr style={{ height: 48 }}>

                            <td>Repository Name</td>
                            <td>
                                <TextField
                                    value={this.state.repoName}
                                    onChange={(e, newValue) => {
                                        this.setState({ repoName: newValue })
                                    }}
                                    placeholder="Provide a name for the repository"
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

