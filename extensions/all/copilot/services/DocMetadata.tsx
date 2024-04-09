import * as SDK from "azure-devops-extension-sdk";

export interface IExtensionDocumentMetadata {
    publisher: string,
    extension: string,
    scopeType: string,
    scopeValue: string,
    collection: string,
}


export class DocumentMetadataManager {
    public getMetadata(): IExtensionDocumentMetadata {
        var host = SDK.getHost();
        var extensionCtx = SDK.getExtensionContext();

        var docMetadata = {
            publisher: extensionCtx.publisherId,
            extension: extensionCtx.extensionId,
            scopeType: "Default",
            scopeValue: "Current",
            collection: "common",
        };
        console.log("docMetadata", docMetadata);
        return docMetadata;
    }
}