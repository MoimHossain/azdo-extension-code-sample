import * as SDK from "azure-devops-extension-sdk";
import { getClient } from "azure-devops-extension-api";
import { ExtensionManagementRestClient } from "azure-devops-extension-api/ExtensionManagement";

interface IExtensionDocumentMetadata {
    publisher: string,
    extension: string,
    scopeType: string,
    scopeValue: string,
    collection: string,
}

class DocumentMetadataManager {
    public static getMetadata(): IExtensionDocumentMetadata {
        var extensionCtx = SDK.getExtensionContext();
        var docMetadata = {
            publisher: extensionCtx.publisherId,
            extension: extensionCtx.extensionId,
            scopeType: "Default",
            scopeValue: "Current",
            collection: "common",
        };        
        return docMetadata;
    }
}

class DocumentService {
    private extensionClient = getClient(ExtensionManagementRestClient);

    public async getDocumentById(collectionName: string, documentId: string, defaultDocument?: any): Promise<any> {
        try {
            const metadata = DocumentMetadataManager.getMetadata();
            const docObject = await this.extensionClient.getDocumentByName(
                metadata.publisher,
                metadata.extension,
                metadata.scopeType,
                metadata.scopeValue,
                collectionName,
                documentId);
            return docObject;
        }
        catch {
            console.log(`getDocumentById(): No document found with ID ${documentId} in collection ID ${collectionName}`);
        }
        return defaultDocument;
    }

    public async listDocuments(collectionName: string, defaultDocuments?: any): Promise<any[]> {
        try {
            const metadata = DocumentMetadataManager.getMetadata();
            var existingDocs = await this.extensionClient
                .getDocumentsByName(
                    metadata.publisher,
                    metadata.extension,
                    metadata.scopeType,
                    metadata.scopeValue,
                    collectionName
                );            
            return existingDocs;
        }
        catch {
            console.log(`listDocuments():: No documents found in collection: ${collectionName}`);
        }
        return defaultDocuments;
    }

    public async deleteDocument(collectionName: string, documentId: string): Promise<boolean> {
        try {
            const metadata = DocumentMetadataManager.getMetadata();
            await this.extensionClient.deleteDocumentByName(
                metadata.publisher,
                metadata.extension,
                metadata.scopeType,
                metadata.scopeValue,
                collectionName,
                documentId);
            return true;
        } catch (error) {
            console.log(`deleteDocument():: Failed to Delete document with ID ${documentId}`, error);            
        }
        return false;
    }

    public async updateDocument(collectionName: string, documentId: string, document: any): Promise<any> {
        let loadedJob = await this.getDocumentById(collectionName, documentId, { id: documentId });
        try {
            delete document.__etag;
            Object.assign(loadedJob, document);
            const metadata = DocumentMetadataManager.getMetadata();

            let updatedDocument = await this.extensionClient.setDocumentByName(
                loadedJob,
                metadata.publisher,
                metadata.extension,
                metadata.scopeType,
                metadata.scopeValue,
                collectionName);
            return updatedDocument;
        } catch (error) {
            console.log(`updateDocument(): Failed to Update document with ID ${documentId}`, error);
        }
        return document;
    }
}

export default DocumentService;