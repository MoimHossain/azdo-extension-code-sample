
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { showRootComponent } from "../../common";
import SplitterContainer from "./components/splitter-container";

class ComplianceHub extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    public async componentDidMount() {
        await SDK.init();
        
        console.log("Access Token", await SDK.getAccessToken());
        console.log("App TOken", await SDK.getAppToken());
    }

    public render(): JSX.Element {
        const containerStyle = { height: "99%", width: "100%", display: "flex" };
        return (
            <div style={containerStyle}>
                <SplitterContainer />
            </div>
        );
    }
}

showRootComponent(<ComplianceHub />);

export default ComplianceHub;