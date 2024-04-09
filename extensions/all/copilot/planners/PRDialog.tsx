import * as React from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { Panel } from "azure-devops-ui/Panel";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import CopilotService from "../services/backend";

export default class PRDialog extends React.Component<any, any> {
    private copilotService = new CopilotService();
    constructor(props: any) {
        super(props);
        this.state = {
            userRequest: this.props.userRequest,
            repoName: this.getRepoNameFromContext(),
            sourceBranch: 'main',
            targetBranch: this.getBranchFromContext(),
            commitMessage: 'Commited by Copilot',
            fileName: '/.azuredevops/azure_pipeline.yml',
            content: this.getYamlContent(),
            prTitle: 'Pipeline Created',
            prDescription: 'A pipeline was created by Copilot'
        }
    }

    private getYamlContentCore() {
        var yamlPipeline = '';
        if(this.props.userRequest != null && 
            this.props.userRequest.concreteRequest != null && 
            this.props.userRequest.concreteRequest.yamlPipeline != null) {
                yamlPipeline = (this.props.userRequest.concreteRequest.yamlPipeline || '');
            }
            return yamlPipeline;          
        
    }

    private getYamlContent() {
        var yamlPipeline = this.getYamlContentCore();
        var parts = (yamlPipeline || '').split("```");
        if(parts.length > 2) {
            return `#${parts[1]}`;
        }
        return yamlPipeline;
    }

    private getRepoNameFromContext() {
        var repoName = '';
        if(this.props.userRequest != null && 
            this.props.userRequest.concreteRequest != null && 
            this.props.userRequest.concreteRequest.arguments != null) {
                repoName = (this.props.userRequest.concreteRequest.arguments.name || '');
            }
            return repoName;  
    }

    private getBranchFromContext() {
        var repoName = 'feature-pipeline';
        if(this.props.userRequest != null && 
            this.props.userRequest.concreteRequest != null && 
            this.props.userRequest.concreteRequest.arguments != null) {
                repoName = (this.props.userRequest.concreteRequest.arguments.repository || '');
            }
            return repoName;  
    }    

    public async componentDidMount() {        


    }

    private async onCreatePR() {
        var payload = {
            repoName: this.state.repoName,
            sourceBranch: this.state.sourceBranch,
            targetBranch: this.state.targetBranch,
            commitMessage: this.state.commitMessage,
            fileName: this.state.fileName,
            content: this.state.content,
            prTitle: this.state.prTitle,
            prDescription: this.state.prDescription            
        }
        console.log('payload', payload);
        var repository = await this.copilotService.getRepository(this.state.repoName);
        console.log('resolved repo', repository);

        var pr = await this.copilotService.createPullRequest(
            repository.id,
            this.state.sourceBranch,
            this.state.targetBranch,
            this.state.commitMessage,
            this.state.fileName,
            this.state.content,
            this.state.prTitle,
            this.state.prDescription);
        this.props.onPRCreated(pr);
    }

    private getDialogCloseButtons() {
        const items = [];
        items.push({ text: "Cancel", onClick: this.props.onDialogCancel });
        items.push({ text: "Create", primary: true, onClick: this.onCreatePR.bind(this) });
        return items;
    }


    public render(): JSX.Element {
        var COMPONENT = this;
        console.log(this.state.userRequest);
        return (
            <Panel
                onDismiss={this.props.onDialogCancel}
                footerButtonProps={this.getDialogCloseButtons()}
                description={`We will create a PR for you in this project`}
                titleProps={{ text: "Pull Request" }}>

                <React.Fragment>                    
                    <table
                        style={{ width: '100%', height: '100px' }}>
                        <tr style={{ height: 48 }}>

                            <td>Repository</td>
                            <td>
                                <TextField
                                    value={this.state.repoName}
                                    onChange={(e, newValue) => {
                                        this.setState({ repoName: newValue })
                                    }}
                                    placeholder="Repository"
                                    width={TextFieldWidth.standard}
                                />
                            </td>
                        </tr>
                        <tr style={{ height: 48 }}>
                            <td>Source Branch</td>
                            <td>
                                <TextField
                                    value={this.state.sourceBranch}
                                    onChange={(e, newValue) => {
                                        this.setState({ sourceBranch: newValue })
                                    }}
                                    placeholder="Source Branch"
                                    width={TextFieldWidth.standard}
                                />
                            </td>
                        </tr>
                        <tr style={{ height: 48 }}>
                            <td>Target Branch</td>
                            <td>
                                <TextField

                                    value={this.state.targetBranch}
                                    onChange={(e, newValue) => {
                                        this.setState({ targetBranch: newValue })
                                    }}
                                    placeholder="Target Branch"
                                    width={TextFieldWidth.standard}
                                />
                            </td>
                        </tr>
                        <tr style={{ height: 48 }}>
                            <td>Commit Message</td>
                            <td>
                                <TextField
                                    value={this.state.commitMessage}
                                    onChange={(e, newValue) => {
                                        this.setState({ commitMessage: newValue })
                                    }}
                                    placeholder="Commit Message"
                                    width={TextFieldWidth.standard}
                                />
                            </td>
                        </tr>                       
                        <tr style={{ height: 48 }}>
                            <td>PR Title</td>
                            <td>
                                <TextField
                                    value={this.state.prTitle}
                                    onChange={(e, newValue) => {
                                        this.setState({ prTitle: newValue })
                                    }}
                                    placeholder="PR Title"
                                    width={TextFieldWidth.standard}
                                />
                            </td>
                        </tr>
                        <tr style={{ height: 48 }}>
                            <td>PR Description</td>
                            <td>
                                <TextField
                                    value={this.state.prDescription}
                                    onChange={(e, newValue) => {
                                        this.setState({ prDescription: newValue })
                                    }}
                                    placeholder="PR Description"
                                    width={TextFieldWidth.standard}
                                />
                            </td>
                        </tr>
                    </table>
                </React.Fragment>
            </Panel >
        );
    }



}

