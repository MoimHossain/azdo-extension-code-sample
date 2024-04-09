

import { getClient } from "azure-devops-extension-api";
import { ExtensionManagementRestClient } from "azure-devops-extension-api/ExtensionManagement";
import { IExtensionDocumentMetadata, DocumentMetadataManager } from './DocMetadata';
import * as SDK from "azure-devops-extension-sdk";


export default class OrgService {
    private extensionClient = getClient(ExtensionManagementRestClient);
    private CONFIG_DOC_NAME = 'MIGRATION-CONFIG';
    private fakeConfigs: any = []; 
    private delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    public runningOnLocalHost() {
        return document.location.hostname === 'localhost';
    }

    public async getExtensionConfig() {
        if (this.runningOnLocalHost()) {
            await this.delay(80);            
            return {
                "id": "MIGRATION-CONFIG",
                "backendUri": "https://azdomigrationbackendapi.azurewebsites.net",
                "__etag": 7,
                "allowedMemberships": "Project Collection Administrators;Project Administrators",
                "copilotBackendUri": "https://neptunecopilot.wittyfield-afb7ce64.westeurope.azurecontainerapps.io/api/chat",
                "openAIModelName": "gpt-35-turbo"
            };
        }

        let configObject: any = null;
        try {
            await SDK.init();
            var hostInfo =  SDK.getHost();
            var organizationName = hostInfo.name;
            console.log("Organization Name: " + organizationName);
            let DOC_METADATA: IExtensionDocumentMetadata = new DocumentMetadataManager().getMetadata();
            configObject = await this.extensionClient.getDocumentByName(
                DOC_METADATA.publisher,
                DOC_METADATA.extension,
                DOC_METADATA.scopeType,
                DOC_METADATA.scopeValue,
                organizationName,
                this.CONFIG_DOC_NAME);
            console.log("Found existing Extension Config config id: " + configObject);
        }
        catch (error) {
            console.log(`Extension was never configred`, error);
            configObject = { id : this.CONFIG_DOC_NAME, backendUri: "" };
        }
        return configObject;                
    }

    public async saveExtensionConfig(configObject: any) {
        if (this.runningOnLocalHost()) {
            await this.delay(80);
            let existingJob = null;
            this.fakeConfigs.forEach((ej: any) => {
                if (ej.id === configObject.id) {
                    existingJob = ej;
                    Object.assign(existingJob, configObject);
                    return false;
                }
            });
            if(existingJob == null) {
                this.fakeConfigs.push(configObject);
            }
            return;
        }
        var hostInfo =  SDK.getHost();
        var organizationName = hostInfo.name;
        console.log("Organization Name: " + organizationName);
        var loadedConfig = await this.getExtensionConfig();
        console.log('Loaded existing Config', loadedConfig)
        delete configObject.__etag;
        console.log('After cleaning up __etag', configObject);
        configObject.id = this.CONFIG_DOC_NAME;
        Object.assign(loadedConfig, configObject);      
        console.log('After applying changes to the loaded config', loadedConfig)
        let DOC_METADATA: IExtensionDocumentMetadata = new DocumentMetadataManager().getMetadata();

        await this.extensionClient.setDocumentByName(loadedConfig,
            DOC_METADATA.publisher,
            DOC_METADATA.extension,
            DOC_METADATA.scopeType,
            DOC_METADATA.scopeValue,
            organizationName);
    }
}