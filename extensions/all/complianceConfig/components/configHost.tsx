
import * as React from "react";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { ConfigTypes } from "./configTypes";
import DefaultFolderSecurityConfig from "./default-folder-security";
import RoleDefinitionConfig from "./role-definitions";
import { ICurrentUserRole } from "../../../shared/schemas/schemas";

const getHeaderDescription = (configType: string) => {
    const configTypeObj = [ConfigTypes.General, ConfigTypes.FolderSecurity, ConfigTypes.RoleDefinition]
        .find((item) => item.title === configType);
    if (configTypeObj != null) {
        return configTypeObj.description;
    }
    return "";
}

const getCommandBarItems = (): IHeaderCommandBarItem[] => {
    return [];
}

const ConfigHost = (
    props: {
        style?: React.CSSProperties,
        currentUserRole: ICurrentUserRole,
        configType: string
    }) => {
    return (
        <>
            <Page className="flex-grow">
                <Header title={props.configType}
                    commandBarItems={getCommandBarItems()}
                    description={getHeaderDescription(props.configType)}
                    titleSize={TitleSize.Large} />
                <div className="page-content page-content-top flex-column rhythm-vertical-16">
                    <Card
                        className="flex-grow bolt-card-no-vertical-padding bolt-table-card"
                        contentProps={{ contentPadding: false }} >
                        <>
                            {
                                props.configType === ConfigTypes.FolderSecurity.title && <DefaultFolderSecurityConfig currentUserRole={props.currentUserRole} />                                
                            }
                            {
                                props.configType === ConfigTypes.RoleDefinition.title && <RoleDefinitionConfig currentUserRole={props.currentUserRole} />
                            }
                        </>
                    </Card>
                </div>
            </Page>
        </>
    )
}

export default ConfigHost;