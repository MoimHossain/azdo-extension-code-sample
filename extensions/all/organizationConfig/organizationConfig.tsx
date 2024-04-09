
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { SplitterElementPosition, Splitter, SplitterDirection } from "azure-devops-ui/Splitter";
import { showRootComponent } from "../../common";
import LeftNavigationMenu from "../complianceConfig/components/settingsMenu";
import ConfigHost from "./configHost";
import { ConfigTypes } from "./configTypes";

class OrganizationConfig extends React.Component<{}, any> {
    private MenuItems = [ConfigTypes.Compliance/*, ConfigTypes.Copilot, ConfigTypes.Feedback*/];
    constructor(props: {}) {
        super(props);
        this.state = {
            collapsed: false,
            selectedMenuItem: this.MenuItems[0]
        };
    }

    public async componentDidMount() {
        await SDK.init();
    }

    private onMenuSelected = (category: string) => {
        // find the MenuItems that matches the category 
        const menuItem = this.MenuItems.find(item => item.title === category);
        if (menuItem) {
            this.setState({ selectedMenuItem: menuItem });
        }
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
                    onRenderFarElement={() => <ConfigHost configType={COMPONENT.state.selectedMenuItem} />}
                />
            </div>
        );
    }
}

showRootComponent(<OrganizationConfig />);

export default OrganizationConfig;

