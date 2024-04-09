
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { SplitterElementPosition, Splitter, SplitterDirection } from "azure-devops-ui/Splitter";
import { showRootComponent } from "../../common";
import LeftNavigationMenu from "./components/settingsMenu";
import ConfigHost from "./components/configHost";
import { ConfigTypes } from "./components/configTypes";
import { ICurrentUserRole } from "../../shared/schemas/schemas";
import Backend from "../../shared/services/backend";

class ComplianceConfig extends React.Component<{}, any> {
    private MenuItems = [ConfigTypes.General, ConfigTypes.FolderSecurity, ConfigTypes.RoleDefinition];
    constructor(props: {}) {
        super(props);
        this.state = {
            collapsed: false,
            selectedMenuItem: '',
            currentUserRole: {} as ICurrentUserRole
        };
    }

    public async componentDidMount() {
        if(Backend.runningOnLocalHost() !== true) {
            await SDK.init();
            console.log("Access Token", await SDK.getAccessToken());
            console.log("App TOken", await SDK.getAppToken());
        }

        console.log("Compliance Config Mounted");
        const currentUserRole = await Backend.getCurrentUserBuiltInRole();
        this.setState({ currentUserRole });
    }

    private onMenuSelected = (category: string) => {
        this.setState({ selectedMenuItem: category });        
    }

    public render(): JSX.Element {
        const containerStyle = { height: "99%", width: "100%", display: "flex" };
        const COMPONENT = this;

        return (
            <div style={containerStyle}>
                <Splitter
                    collapsed={COMPONENT.state.collapsed}
                    fixedElement={SplitterElementPosition.Near}
                    splitterDirection={SplitterDirection.Vertical}
                    initialFixedSize={300}
                    minFixedSize={100}
                    nearElementClassName="v-scroll-auto custom-scrollbar"
                    farElementClassName="v-scroll-auto custom-scrollbar"
                    onCollapsedChanged={collapsed => {
                        COMPONENT.setState({ collapsed });
                    }}
                    onRenderNearElement={() => <LeftNavigationMenu menuItems={COMPONENT.MenuItems} onSelected={COMPONENT.onMenuSelected.bind(COMPONENT)} />}
                    onRenderFarElement={() => <ConfigHost 
                        currentUserRole={COMPONENT.state.currentUserRole} 
                        configType={COMPONENT.state.selectedMenuItem} />}
                />
            </div>
        );
    }
}

showRootComponent(<ComplianceConfig />);

export default ComplianceConfig;