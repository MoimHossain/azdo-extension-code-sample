
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { showRootComponent } from "../../common";
import NewRepositoryDialogBody from "../governed-repository/components/NewRepositoryDialogBody";
import { Panel } from "azure-devops-ui/Panel";

export default class DummyHost extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {

    };
  }

  public render(): JSX.Element {
    return (
      <NewRepositoryDialogBody onDismiss={() => { }} />
    );
  }
}

showRootComponent(<DummyHost />);

