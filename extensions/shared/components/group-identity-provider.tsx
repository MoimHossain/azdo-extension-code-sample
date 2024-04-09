
import {
    IIdentity,
    IPeoplePickerProvider,
    IPersonaConnections,
} from "azure-devops-ui/IdentityPicker";

import IdentityV2Client from "../services/identityServie";

export class GroupIdentityProvider implements IPeoplePickerProvider {    

    public async onFilterIdentities(filter: string, selectedItems?: IIdentity[]) {                
        //return this.identityService.searchIdentities(filter);
        const unfilteredGroups = await IdentityV2Client.searchIdentities(filter);
        console.log("onFilterIdentities()::unfilteredGroups", unfilteredGroups);
        const filteredGroups = await IdentityV2Client.trimGroups(unfilteredGroups);
        console.log("onFilterIdentities()::filteredGroups", filteredGroups);
        return filteredGroups;
    }

    public onEmptyInputFocus(): IIdentity[] {        
        return [];
    }

    
    public getEntityFromUniqueAttribute = (entityId: string): IIdentity => {
        console.log("WE SHOLD NOT SEE IT getEntityFromUniqueAttribute", entityId);
        return null as any;
    };

    public onRequestConnectionInformation = (
        entity: IIdentity,
        getDirectReports?: boolean
    ): IPersonaConnections => {
        console.log("WE SHOLD NOT SEE IT onRequestConnectionInformation", entity);
        return {};
    };
}