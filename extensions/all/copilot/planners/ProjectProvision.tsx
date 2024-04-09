import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import CopilotService from "../services/backend";

export default class ProjectProvision extends React.Component<any, any> {
    private copilotService = new CopilotService();
    constructor(props: any) {
        super(props);
        this.state = {
            projectName: this.props.projectName
        }
    }

    private async onProjectCreate() {
        var project = await this.copilotService.createProject(this.state.projectName);
        this.props.onProjectCreated(project);
    }

    private getDialogCloseButtons() {
        const items = [];
        items.push({ text: "Cancel", onClick: this.props.onDialogCancel });
        if (this.state.projectName != null && this.state.projectName.length > 0) {
            items.push({ text: "Create", primary: true, onClick: this.onProjectCreate.bind(this) });
        }
        return items;
    }


    public render(): JSX.Element {
        return (
            <Panel
                onDismiss={this.props.onDialogCancel}
                footerButtonProps={this.getDialogCloseButtons()}
                description={`We will create a new project`}
                titleProps={{ text: "New Project" }}>

                <React.Fragment>
                    
                    <table
                        style={{ width: '100%', height: '100px' }}>
                        <tr style={{ height: 48 }}>

                            <td>Project Name</td>
                            <td>
                                <TextField
                                    value={this.state.projectName}
                                    onChange={(e, newValue) => {
                                        this.setState({ projectName: newValue })
                                    }}
                                    placeholder="Provide a name for the Project"
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

