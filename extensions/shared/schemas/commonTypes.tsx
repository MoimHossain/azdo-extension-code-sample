import * as React from "react";
import { ISimpleListCell } from "azure-devops-ui/List";
import { ISimpleTableCell } from "azure-devops-ui/Table";

import { IFolder } from "./schemas";

export interface CSSNodeSlim {
    id: string;
    name: string;
    structureType: string;
    cssPath: string;
    securityToken: string;
}

export interface ILinkEntity {
    path: string;
    resourceId: string;
}

export interface ITableItem extends ISimpleTableCell {
    details: ISimpleListCell
}


export const Icons = {
    runningOnLocalHost() {
        return document.location.hostname === 'localhost';
    },
    getBasePath: () => {
        const url = window.location.href;        
        const baseUrl = url.substr(0, url.indexOf("/dist/"));        
        return baseUrl;
    },
    repositoryIcon: () => {
        return `${Icons.getBasePath()}/assets/images/git.png`;
    },
    folderIcon: () => {
        return `${Icons.getBasePath()}/assets/images/folder.png`;
    },
    environmentIcon: () => {
        return `${Icons.getBasePath()}/assets/images/environment.png`;
    },
    serviceConnectionIcon: () => {
        return `${Icons.getBasePath()}/assets/images/service-connection.png`;
    },
    variableGroupIcon: () => {
        return `${Icons.getBasePath()}/assets/images/variable-group.png`;
    },
    areaPathIcon: () => {
        return `${Icons.getBasePath()}/assets/images/area-path.png`;
    },
    iterationPathIcon: () => {
        return `${Icons.getBasePath()}/assets/images/iteration-path.png`;
    },
    areaIcon: () => {
        return `${Icons.getBasePath()}/assets/images/area.png`;
    },
    squadIcon: () => {
        return `${Icons.getBasePath()}/assets/images/squad.png`;
    },
    applicationIcon: () => {
        return `${Icons.getBasePath()}/assets/images/application.png`;
    },
    zoneIcon: () => {
        return `${Icons.getBasePath()}/assets/images/zone.png`;
    }
    
}

export const BusyIcon = () => {
    return <img alt="" style={{ width: 24, height: 24, marginRight: 4}} src={`${Icons.getBasePath()}/assets/images/loading.gif`} />;
}

export interface IGenericLinkItem {//extends ISimpleTableCell {
    //name: ISimpleListCell;
    checked: boolean;
    originalObjectRef: any
}

const renderImgWithUri = (uri: string) => {
    return <img alt="" style={{ width: 24, height: 24, marginRight: 4}} src={uri} />;
}

export const RENDER = {
    folder: () => renderImgWithUri(Icons.folderIcon()),
    repository: () => renderImgWithUri(Icons.repositoryIcon()),
    environment: () => renderImgWithUri(Icons.environmentIcon()),
    serviceConnection: () => renderImgWithUri(Icons.serviceConnectionIcon()),
    variableGroup: () => renderImgWithUri(Icons.variableGroupIcon()),
    areaPath: () => renderImgWithUri(Icons.areaPathIcon()),
    iterationPath: () => renderImgWithUri(Icons.iterationPathIcon()),
    area: () => renderImgWithUri(Icons.areaIcon()),
    squad: () => renderImgWithUri(Icons.squadIcon()),
    application: () => renderImgWithUri(Icons.applicationIcon()),
    zone: () => renderImgWithUri(Icons.zoneIcon()),

    getFolderRenderer: (folder: IFolder) =>  {        
        switch (folder.kind.toUpperCase()) {
            case "AREA": return RENDER.area; break;            
            case "SQUAD": return RENDER.squad; break;
            case "APPLICATION": return RENDER.application; break;
            case "ZONE": return RENDER.zone; break;            
            default: return RENDER.folder; break;
        }
    }
}