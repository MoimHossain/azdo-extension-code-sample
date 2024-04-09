
import * as SDK from "azure-devops-extension-sdk";
import { IUserContext } from "azure-devops-extension-sdk";
import { GitRestClient } from 'azure-devops-extension-api/Git';
import { TaskAgentRestClient } from 'azure-devops-extension-api/TaskAgent';
import { ServiceEndpointRestClient } from 'azure-devops-extension-api/ServiceEndpoint';
import { WorkItemClassificationNode, WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking';
import { CommonServiceIds, getClient, IProjectPageService, IHostNavigationService } from "azure-devops-extension-api";



import DummyData from "./localDevelopment";
import DocumentService from "./documentDatabase";

export const DBDocumentIds = {
    GlobalConfigId: "globalconfig"
}

export interface ComplianceConfig {
    backendUri: string;    
}

export interface CopilotConfig {
    backendUri: string;
    openAiModelName: string;
}

export interface GlobalExtensionConfig {
    id: string;
    complianceConfig: ComplianceConfig;
    copilotConfig: CopilotConfig;
}


class ConfigService {
    private documentService = new DocumentService();
    private delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    private runningOnLocalHost() {
        return document.location.hostname === 'localhost';
    }

    public async getGlobalExtensionConfig(): Promise<GlobalExtensionConfig> {
        let defaultDoc = DummyData.globalConfig
        defaultDoc.id = DBDocumentIds.GlobalConfigId;


        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return defaultDoc;
        }

        const organizationName = await this.getCurrentOrganizationName();
        let globalConfig = await this.documentService.getDocumentById(organizationName, DBDocumentIds.GlobalConfigId, defaultDoc);
        return globalConfig as GlobalExtensionConfig;
    }

    public async setGlobalExtensionConfig(globalConfig: GlobalExtensionConfig): Promise<void> {
        if (this.runningOnLocalHost()) {
            await this.delay(1);
            // Do nothing
        } else {
            const organizationName = await this.getCurrentOrganizationName();
            await this.documentService.updateDocument(organizationName, DBDocumentIds.GlobalConfigId, globalConfig);
        }
    }
    
    public getCurrentUser(): IUserContext {
        return SDK.getUser();
    }

    public async getCurrentProjectId(): Promise<any> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return "PROJECT_ID_FAKE";
        }

        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        return (project ? project.id : '');
    }

    public async getCurrentOrganizationName(): Promise<any> {
        if (this.runningOnLocalHost()) {
            await this.delay(800);
            return "ORGNIZATION_NAME_FAKE";
        }

        const hostInfo = SDK.getHost();
        return (hostInfo ? hostInfo.name : '');
    }
}


export default (new ConfigService());