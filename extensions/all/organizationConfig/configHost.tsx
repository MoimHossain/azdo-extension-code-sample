
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { ConfigTypes } from "./configTypes";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { FormItem } from "azure-devops-ui/FormItem";
import { TableFrame, TableRow, TableCell, ITableColumn } from "../../shared/components/htmlFragments";
import ConfigService from "../../shared/services/configService";
import FeedbackExplorer from "./feedback";




const ConfigHost = (
    props: {
        style?: React.CSSProperties,
        configType: {
            title: string,
            description: string
        }
    }) => {
    const [copilotBackendUri, setCopilotBackendUri] = React.useState<string>("");    
    const [complianceBackendUri, setComplianceBackendUri] = React.useState<string>("");

    const saveButton = {
        iconProps: {
            iconName: "Save"
        },
        id: "SaveSettings",
        important: true,
        onActivate: () => {
            setTimeout(async () => {
                const globalConfig = await ConfigService.getGlobalExtensionConfig();
                if (globalConfig) {
                    if (props.configType.title === ConfigTypes.Copilot.title) {
                        globalConfig.copilotConfig = globalConfig.copilotConfig || {};
                        globalConfig.copilotConfig.backendUri = copilotBackendUri;                        
                    }

                    if (props.configType.title === ConfigTypes.Compliance.title) {
                        globalConfig.complianceConfig = globalConfig.complianceConfig || {};
                        globalConfig.complianceConfig.backendUri = complianceBackendUri;
                    }
                    await ConfigService.setGlobalExtensionConfig(globalConfig);
                }
            }, 1);
        },
        text: "Save",
        isPrimary: true,
        tooltipProps: {
            text: "Save settings"
        }
    };

    React.useEffect(() => {
        setTimeout(async () => {
            const globalConfig = await ConfigService.getGlobalExtensionConfig();
            if (globalConfig) {
                if (globalConfig.copilotConfig) {
                    setCopilotBackendUri(globalConfig.copilotConfig.backendUri);                    
                }
                if (globalConfig.complianceConfig) {
                    setComplianceBackendUri(globalConfig.complianceConfig.backendUri);
                }
            }
        }, 1);
    }, []);

    const getCommandBarItems = (): IHeaderCommandBarItem[] => {
        if (ConfigTypes.Feedback === props.configType) {
            return [];
        }
        return [saveButton];
    }

    return (
        <>
            <Page className="flex-grow">
                <Header title={props.configType.title}
                    commandBarItems={getCommandBarItems()}
                    description={props.configType.description}
                    titleSize={TitleSize.Large} />
                <div className="page-content page-content-top flex-column rhythm-vertical-16">
                    <Card
                        className="flex-grow bolt-card-no-vertical-padding bolt-table-card"
                        contentProps={{ contentPadding: false }} >
                        <>
                            {
                                ConfigTypes.Feedback.title === props.configType.title &&
                                <FeedbackExplorer />
                            }
                            {
                                ConfigTypes.Feedback !== props.configType &&
                                <TableFrame hideHeaders={true} columns={[]} style={{ width: '100%', paddingBottom: 20, paddingLeft: 20 }}>
                                    <>
                                        {
                                            ConfigTypes.Copilot === props.configType &&
                                            <>
                                                <TableRow className="ignore-cssnames">
                                                    <TableCell style={{ width: '95%' }}>
                                                        <FormItem label="Backend URI:">
                                                            <TextField
                                                                value={copilotBackendUri}
                                                                readOnly={false}
                                                                spellCheck={false}
                                                                required={true}
                                                                onChange={(e, newValue) => { setCopilotBackendUri(newValue); }}
                                                                placeholder="Backend URI"
                                                                width={TextFieldWidth.standard}
                                                            />
                                                        </FormItem>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        }
                                        {
                                            ConfigTypes.Compliance.title === props.configType.title &&
                                            <>
                                                <TableRow className="ignore-cssnames">
                                                    <TableCell style={{ width: '95%' }}>
                                                        <FormItem label="Backend URI:">
                                                            <TextField
                                                                value={complianceBackendUri}
                                                                readOnly={false}
                                                                spellCheck={false}
                                                                required={true}
                                                                onChange={(e, newValue) => { setComplianceBackendUri(newValue); }}
                                                                placeholder="Based URI to the compliance backend."
                                                                width={TextFieldWidth.standard}
                                                            />
                                                        </FormItem>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        }
                                    </>
                                </TableFrame>
                            }
                        </>

                    </Card>
                </div>
            </Page>
        </>
    )
}

export default ConfigHost;