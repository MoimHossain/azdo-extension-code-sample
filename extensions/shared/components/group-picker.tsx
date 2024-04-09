import * as React from "react";
import {
    IdentityPickerDropdown,
    IIdentity
} from "azure-devops-ui/IdentityPicker";
import { GroupIdentityProvider } from "./group-identity-provider";
import IdentityV2Client from "../services/identityServie";

const GroupPicker = (
    props: {        
        onChange: (item?: IIdentity) => boolean | void;
        identity?: IIdentity | undefined,
        className?: string,
        noResultsFoundText?: string,
        editPlaceholder?: string,
        placeholder?: string
    }) => {
    const pickerProvider = new GroupIdentityProvider();

    const selectIdentity = (identity?: IIdentity) => {        
        setTimeout(async () => {            
            if(identity) {
                if(!(identity.subjectDescriptor && identity.subjectDescriptor.length > 0)) {                    
                    const materialziedIdentity = await IdentityV2Client.materializeIdentity(identity);
                    console.log("selectIdentity::materializeIdentity::materialziedIdentity", materialziedIdentity);
                    if(materialziedIdentity && materialziedIdentity.localId && materialziedIdentity.localId.length > 0) {
                        props.onChange(materialziedIdentity);
                    }
                }
                else {
                    console.log("selectIdentity::identity", identity);
                    props.onChange(identity);
                }
            }
        }, 1);
    }        

    return (
        <>
            <IdentityPickerDropdown
                className={props.className || "role-dropdown"}
                onChange={selectIdentity}
                pickerProvider={pickerProvider}
                noResultsFoundText={props.noResultsFoundText}
                editPlaceholder={props.editPlaceholder}
                placeholder={props.placeholder}
                value={props.identity}
            />
        </>
    );
}

export default GroupPicker;