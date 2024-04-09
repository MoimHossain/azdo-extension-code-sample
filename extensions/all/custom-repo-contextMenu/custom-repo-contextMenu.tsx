import * as React from 'react';
import * as SDK from 'azure-devops-extension-sdk';
import { CommonServiceIds, IHostPageLayoutService, PanelSize } from 'azure-devops-extension-api';
 
const Container = () => {
    return (
        <div/>
    );
};
 
export default Container;
 
function createPanelHandler(contentContributionId: string, title: string, isEdit: boolean) {
    return () => {
        'use strict';
        return {
            async execute() {
                const extensionContext = SDK.getExtensionContext();
                const panelId = `${extensionContext.publisherId}.${extensionContext.extensionId}.${contentContributionId}`;
 
                const panelService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);
                panelService.openPanel<boolean | undefined>(
                    panelId, {
                        title,
                        size: PanelSize.Medium,
                        configuration: {
                            registeredRootElement: contentContributionId,
                            isEdit
                        }
                    });
            },
        };
    };
}
 
SDK.init().then(() => {
    SDK.register('custom-repo-contextMenu', createPanelHandler('governed-repository-action', 'New Governed Repository', false));
});
 