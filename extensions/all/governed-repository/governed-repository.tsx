
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { showRootComponent } from "../../common";
import NewRepositoryDialogBody from "../governed-repository/components/NewRepositoryDialogBody";

export default class NewRepoDialog extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {

    };
  }

  private dismiss() {
    const result = undefined;
    const config = SDK.getConfiguration();
    if (config.dialog) {
      config.dialog.close(result);
    } else if (config.panel) {
      config.panel.close(result);
    }
  }

  public async componentDidMount() {
    SDK.init();
    await SDK.ready();

    const config = SDK.getConfiguration();
    console.log('config', config);

    await SDK.notifyLoadSucceeded();
    SDK.resize();
  }

  public render(): JSX.Element {
    return (
      <NewRepositoryDialogBody onDismiss={this.dismiss} />
    );
  }
}

showRootComponent(<NewRepoDialog />);

