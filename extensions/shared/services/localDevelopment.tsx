
/*
const fakeServiceEndpoints: any[] = [];
const fakeVariableGroups: any = [];
const fakeEnvironments: any = [];
const fakeRepositories: any = [];
const fakeIdentitySearchResponse: any = [];
const fakeAreaPaths: any = [];
const fakeIterationPaths: any = [];
const fakeGlobalConfig: GlobalExtensionConfig = {
    complianceConfig: {
        backendUri: "https://localhost:44300"
    },
    copilotConfig: {
        backendUri: "https://localhost:44300",
        openAiModelName: "davinci"
    },
    id: "globalconfig"
}

let folders = [];

export const DummyData = {
    identities: fakeIdentitySearchResponse,
    serviceEndpoints: fakeServiceEndpoints,
    variableGroups: fakeVariableGroups,
    environments: fakeEnvironments,
    repositories: fakeRepositories,
    folders: folders,
    areaPaths: fakeAreaPaths,
    fakeActionRequests: [],
    iterationPaths: fakeIterationPaths
}
*/

const fakeGlobalConfig: any = {
    complianceConfig: {
        backendUri: "https://localhost:44300"
    },
    copilotConfig: {
        backendUri: "https://localhost:44300",
        openAiModelName: "davinci"
    },
    id: "globalconfig"
}

const fakeActionRequests = [
    {
        "category": "Repository",
        "folderPath": "Tech4Dev/Atlas",
        "nativeItemName": "AzDo-ProjectAsCode",
        "requestedOn": "\/Date(1692697440036)\/",
        "folderPermissions": [
            {
                "identity": {
                    "entityId": "vss.ds.v1.ims.group.0162f8787a2144f890e19927f4c21d0b",
                    "entityType": "Group",
                    "originDirectory": "vsd",
                    "originId": "0162f878-7a21-44f8-90e1-9927f4c21d0b",
                    "localDirectory": "vsd",
                    "localId": "0162f878-7a21-44f8-90e1-9927f4c21d0b",
                    "displayName": "[Tech4Eng-Demo]\\Tech4Eng-Administrators",
                    "scopeName": "moim",
                    "samAccountName": "Tech4Eng-Administrators",
                    "active": true,
                    "subjectDescriptor": "vssgp.Uy0xLTktMTU1MTM3NDI0NS0yNDgzODc1NTE5LTIwNjEzMDI4NTktMjQ0ODg0MTg1My0xMDM0NjQxNDY5LTEtNDI1NDU1ODA1Ni00Njc4Nzk0OTgtMjU5NjA4NjcxNC0xNDA0NTQ3MjI",
                    "department": null,
                    "jobTitle": null,
                    "mail": "",
                    "mailNickname": null,
                    "physicalDeliveryOfficeName": null,
                    "signInAddress": null,
                    "surname": null,
                    "guest": false,
                    "telephoneNumber": null,
                    "description": null,
                    "isMru": false,
                    "image": "/moim/_apis/GraphProfile/MemberAvatars/vssgp.Uy0xLTktMTU1MTM3NDI0NS0yNDgzODc1NTE5LTIwNjEzMDI4NTktMjQ0ODg0MTg1My0xMDM0NjQxNDY5LTEtNDI1NDU1ODA1Ni00Njc4Nzk0OTgtMjU5NjA4NjcxNC0xNDA0NTQ3MjI",
                    "isHosted": true
                },
                "permission": [],
                "role": {
                    "displayName": "Administrator",
                    "name": "Administrator",
                    "allowPermissions": 27,
                    "denyPermissions": 0,
                    "identifier": "distributedtask.environmentreferencerole.Administrator",
                    "description": "Administrator can administer permissions, manage, view and use an environment.",
                    "scope": "distributedtask.environmentreferencerole"
                }
            },
            {
                "identity": {
                    "entityId": "vss.ds.v1.ims.group.b4e80dbe8c494ff19a044bd7a2081e30",
                    "entityType": "Group",
                    "originDirectory": "vsd",
                    "originId": "b4e80dbe-8c49-4ff1-9a04-4bd7a2081e30",
                    "localDirectory": "vsd",
                    "localId": "b4e80dbe-8c49-4ff1-9a04-4bd7a2081e30",
                    "displayName": "[Tech4Eng-Demo]\\Tech4Dev-Administrators",
                    "scopeName": "moim",
                    "samAccountName": "Tech4Dev-Administrators",
                    "active": true,
                    "subjectDescriptor": "vssgp.Uy0xLTktMTU1MTM3NDI0NS0yNDgzODc1NTE5LTIwNjEzMDI4NTktMjQ0ODg0MTg1My0xMDM0NjQxNDY5LTEtMjI0NTc5NTYzLTE1MjUyMDM3OTEtMjc3NjYyMzI2Mi01NzY0OTgyNTM",
                    "department": null,
                    "jobTitle": null,
                    "mail": "",
                    "mailNickname": null,
                    "physicalDeliveryOfficeName": null,
                    "signInAddress": null,
                    "surname": null,
                    "guest": false,
                    "telephoneNumber": null,
                    "description": null,
                    "isMru": false,
                    "image": "/moim/_apis/GraphProfile/MemberAvatars/vssgp.Uy0xLTktMTU1MTM3NDI0NS0yNDgzODc1NTE5LTIwNjEzMDI4NTktMjQ0ODg0MTg1My0xMDM0NjQxNDY5LTEtMjI0NTc5NTYzLTE1MjUyMDM3OTEtMjc3NjYyMzI2Mi01NzY0OTgyNTM",
                    "isHosted": true
                },
                "permission": [],
                "role": {
                    "displayName": "Administrator",
                    "name": "Administrator",
                    "allowPermissions": 27,
                    "denyPermissions": 0,
                    "identifier": "distributedtask.environmentreferencerole.Administrator",
                    "description": "Administrator can administer permissions, manage, view and use an environment.",
                    "scope": "distributedtask.environmentreferencerole"
                }
            }
        ],
        "requestedBy": {
            "descriptor": "aad.ZTBmZjNjMjYtM2ViZC03YjRmLWJmM2YtNjY1N2U3ODdiNDYz",
            "id": "8404cfbd-3b57-406c-8a02-5cf2ee1bbc2f",
            "name": "Moim_Hossain@hotmail.com",
            "displayName": "Moim Hossain",
            "imageUrl": "https://dev.azure.com/moim/_apis/GraphProfile/MemberAvatars/aad.ZTBmZjNjMjYtM2ViZC03YjRmLWJmM2YtNjY1N2U3ODdiNDYz"
        }
    }
];

const fakeAreaPaths: any = { "id": 2563, "identifier": "f93680b5-c7cb-46dc-9cc4-973c58de2b19", "name": "Platform", "structureType": "area", "hasChildren": true, "children": [{ "id": 3669, "identifier": "a52b1bb4-98c4-4480-ace7-e27e0fa7a347", "name": "HR", "structureType": "area", "hasChildren": true, "children": [{ "id": 3682, "identifier": "1667e680-59eb-4cc2-a177-aca40e144c2a", "name": "Internal", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\HR\\Internal", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/HR/Internal" }, { "id": 3683, "identifier": "c97d10f4-41b4-47db-9093-b8f0a12f4aa5", "name": "Recruitment", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\HR\\Recruitment", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/HR/Recruitment" }], "path": "\\Platform\\Area\\HR", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/HR" }, { "id": 3670, "identifier": "7397dc23-52e0-4983-aa80-25c24e5b2b12", "name": "Finance", "structureType": "area", "hasChildren": true, "children": [{ "id": 3679, "identifier": "447e27c6-abc8-4f90-8e16-61cf61b58b90", "name": "EMEA", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Finance\\EMEA", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Finance/EMEA" }, { "id": 3680, "identifier": "68e8f9e3-7c76-492c-b66c-21a795240007", "name": "US", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Finance\\US", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Finance/US" }, { "id": 3681, "identifier": "c5907a02-82c3-437a-bf4a-c467514bfe74", "name": "South Americas", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Finance\\South Americas", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Finance/South%20Americas" }], "path": "\\Platform\\Area\\Finance", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Finance" }, { "id": 3671, "identifier": "568eb45d-55b9-4a66-82e8-ff2d3ec7dd3a", "name": "Sales", "structureType": "area", "hasChildren": true, "children": [{ "id": 3686, "identifier": "0e7e75db-5a8c-4919-94aa-86cbc23b81e3", "name": "Pre-Sales", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Sales\\Pre-Sales", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Sales/Pre-Sales" }, { "id": 3687, "identifier": "067591f1-4819-434f-b507-84db3b8aa317", "name": "Pipeline", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Sales\\Pipeline", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Sales/Pipeline" }], "path": "\\Platform\\Area\\Sales", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Sales" }, { "id": 3672, "identifier": "56c88697-8f39-4426-a08c-e84c4db0f600", "name": "Services", "structureType": "area", "hasChildren": true, "children": [{ "id": 3684, "identifier": "9b711123-b73f-46de-9507-d1da099eb860", "name": "PSfD", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Services\\PSfD", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Services/PSfD" }, { "id": 3685, "identifier": "0eb56dc0-bad4-46ff-b66e-e046825f29f3", "name": "Premier", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Services\\Premier", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Services/Premier" }], "path": "\\Platform\\Area\\Services", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Services" }, { "id": 3673, "identifier": "22853f1f-ca95-4688-8afd-70efc38cc87f", "name": "Engineering", "structureType": "area", "hasChildren": true, "children": [{ "id": 3674, "identifier": "6218c8f7-0d88-4e6b-a4fb-dead8dc044e5", "name": "iOS", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Engineering\\iOS", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Engineering/iOS" }, { "id": 3675, "identifier": "76994bd0-aa93-4319-8c4d-f4c5f6aa69ec", "name": "Web", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Engineering\\Web", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Engineering/Web" }, { "id": 3676, "identifier": "e3d5153f-f57c-41b3-acea-940328c759c7", "name": "Cloud", "structureType": "area", "hasChildren": true, "children": [{ "id": 3677, "identifier": "bcef2ccf-84f3-47f5-8d95-23dfa6506605", "name": "Public Cloud", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Engineering\\Cloud\\Public Cloud", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Engineering/Cloud/Public%20Cloud" }, { "id": 3678, "identifier": "f40438ca-84b1-42c5-9810-5029bea08e87", "name": "On Premises", "structureType": "area", "hasChildren": false, "path": "\\Platform\\Area\\Engineering\\Cloud\\On Premises", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Engineering/Cloud/On%20Premises" }], "path": "\\Platform\\Area\\Engineering\\Cloud", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Engineering/Cloud" }], "path": "\\Platform\\Area\\Engineering", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas/Engineering" }], "path": "\\Platform\\Area", "_links": { "self": { "href": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas" } }, "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Areas" }

const fakeIterationPaths: any = { "id": 2555, "identifier": "1260fa20-5ca3-4d5b-b35c-86e1a3171bd5", "name": "Platform", "structureType": "iteration", "hasChildren": true, "children": [{ "id": 2557, "identifier": "9a12aa29-ab3f-42a6-bc92-750a0198eee5", "name": "Sprint 1", "structureType": "iteration", "hasChildren": false, "attributes": { "startDate": "2023-02-28T00:00:00Z", "finishDate": "2023-03-07T00:00:00Z" }, "path": "\\Platform\\Iteration\\Sprint 1", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations/Sprint%201" }, { "id": 2558, "identifier": "b68ba25d-7e89-4b10-9a0f-7e9a2c63a08a", "name": "Sprint 2", "structureType": "iteration", "hasChildren": false, "attributes": { "startDate": "2023-03-08T00:00:00Z", "finishDate": "2023-03-15T00:00:00Z" }, "path": "\\Platform\\Iteration\\Sprint 2", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations/Sprint%202" }, { "id": 2559, "identifier": "8f526b96-fd71-4f5f-9f64-afb001d057af", "name": "Sprint 3", "structureType": "iteration", "hasChildren": false, "attributes": { "startDate": "2023-03-16T00:00:00Z", "finishDate": "2023-03-23T00:00:00Z" }, "path": "\\Platform\\Iteration\\Sprint 3", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations/Sprint%203" }, { "id": 2560, "identifier": "e388ddc3-4c07-4897-9f4d-5fc528c70686", "name": "Sprint 4", "structureType": "iteration", "hasChildren": false, "attributes": { "startDate": "2023-03-24T00:00:00Z", "finishDate": "2023-03-31T00:00:00Z" }, "path": "\\Platform\\Iteration\\Sprint 4", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations/Sprint%204" }, { "id": 2561, "identifier": "93c2ff42-9db5-4e18-bdf2-6d9ebbb659c7", "name": "Sprint 5", "structureType": "iteration", "hasChildren": false, "attributes": { "startDate": "2023-04-03T00:00:00Z", "finishDate": "2023-04-10T00:00:00Z" }, "path": "\\Platform\\Iteration\\Sprint 5", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations/Sprint%205" }, { "id": 2562, "identifier": "b69ebf75-56c2-45d2-bb75-0931ebb7248f", "name": "Sprint 6", "structureType": "iteration", "hasChildren": false, "attributes": { "startDate": "2023-04-11T00:00:00Z", "finishDate": "2023-04-18T00:00:00Z" }, "path": "\\Platform\\Iteration\\Sprint 6", "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations/Sprint%206" }], "path": "\\Platform\\Iteration", "_links": { "self": { "href": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations" } }, "url": "https://dev.azure.com/moim/1853c648-0f7d-4f1e-80ab-fd1ecd333520/_apis/wit/classificationNodes/Iterations" }


const fakeServiceEndpoints: any[] = [
    {
        "id": "022f6a75-b54c-488a-a6b1-7f20a0d097f5",
        "name": "MySCOnnection",
        "type": "azurerm",
        "url": "https://management.azure.com/",
        "isShared": false,
        "isReady": true,
        "owner": "Library"
    },
    {
        "id": "122f6a75-b54c-488a-a6b1-7f20a0d097f5",
        "name": "DockerConnection",
        "type": "azurerm",
        "url": "https://management.azure.com/",
        "isShared": false,
        "isReady": true,
        "owner": "Library"
    },
    {
        "id": "422f6a75-b54c-488a-a6b1-7f20a0d097f5",
        "name": "AzureRM Connection",
        "type": "azurerm",
        "url": "https://management.azure.com/",
        "isShared": false,
        "isReady": true,
        "owner": "Library"
    }
]
const fakeVariableGroups: any = [
    {
        "id": 4,
        "type": "Vsts",
        "name": "VG-Group",
        "description": "",
        "createdOn": "\/Date(1647356897930)\/",
        "modifiedOn": "\/Date(1647356949960)\/",
        "isShared": false,
        "variableGroupProjectReferences": null
    },
    {
        "id": 5,
        "type": "Vsts",
        "name": "VG-Group-Azure",
        "description": "",
        "createdOn": "\/Date(1647356897930)\/",
        "modifiedOn": "\/Date(1647356949960)\/",
        "isShared": false,
        "variableGroupProjectReferences": null
    },
    {
        "id": 6,
        "type": "Vsts",
        "name": "VG-Group-Docker",
        "description": "",
        "createdOn": "\/Date(1647356897930)\/",
        "modifiedOn": "\/Date(1647356949960)\/",
        "isShared": false,
        "variableGroupProjectReferences": null
    }
];
const fakeEnvironments: any = [
    {
        "id": 62,
        "name": "Gen-Environment",
        "description": "",        
        "lastModifiedOn": "\/Date(1678085691813)\/",
        "project": {
            "id": "85853048-1ab9-4316-a63f-48ed349b7279",
            "name": null
        }
    },
    {
        "id": 63,
        "name": "Wwa-Environment",
        "description": "",        
        "lastModifiedOn": "\/Date(1678085691813)\/",
        "project": {
            "id": "85853048-1ab9-4316-a63f-48ed349b7279",
            "name": null
        }
    },
    {
        "id": 64,
        "name": "XX-Environment",
        "description": "",        
        "lastModifiedOn": "\/Date(1678085691813)\/",
        "project": {
            "id": "85853048-1ab9-4316-a63f-48ed349b7279",
            "name": null
        }
    },
    {
        "id": 61,
        "name": "My-Fav-Environment",
        "description": "",        
        "lastModifiedOn": "\/Date(1678085691813)\/",
        "project": {
            "id": "85853048-1ab9-4316-a63f-48ed349b7279",
            "name": null
        }
    }
]
const fakeRepositories: any = [
    {
        "id": "978f9bf3-5054-4d08-942e-76030f0c93e0",
        "name": "Platform.moim.hossain",
        "url": "https://dev.azure.com/moim/85853048-1ab9-4316-a63f-48ed349b7279/_apis/git/repositories/978f9bf3-5054-4d08-942e-76030f0c93e0",
        "project": {
            "id": "85853048-1ab9-4316-a63f-48ed349b7279",
            "name": "Tulsa",
            "description": "BI Engineering teams project",
            "url": "https://dev.azure.com/moim/_apis/projects/85853048-1ab9-4316-a63f-48ed349b7279",
            "state": 1,
            "revision": 438083097,
            "visibility": 0,
            "lastUpdateTime": "\/Date(1670851110597)\/"
        },
        "defaultBranch": "refs/heads/main",
        "size": 28469,
        "remoteUrl": "https://moim@dev.azure.com/moim/Tulsa/_git/Platform.moim.hossain",
        "sshUrl": "git@ssh.dev.azure.com:v3/moim/Tulsa/Platform.moim.hossain",
        "webUrl": "https://dev.azure.com/moim/Tulsa/_git/Platform.moim.hossain",
        "isFork": true,
        "isDisabled": false,
        "isInMaintenance": false
    },
    {
        "id": "151da89b-daeb-4a69-8ae6-e91044546f39",
        "name": "Temp",
        "url": "https://dev.azure.com/moim/85853048-1ab9-4316-a63f-48ed349b7279/_apis/git/repositories/151da89b-daeb-4a69-8ae6-e91044546f39",
        "project": {
            "id": "85853048-1ab9-4316-a63f-48ed349b7279",
            "name": "Tulsa",
            "description": "BI Engineering teams project",
            "url": "https://dev.azure.com/moim/_apis/projects/85853048-1ab9-4316-a63f-48ed349b7279",
            "state": 1,
            "revision": 438083097,
            "visibility": 0,
            "lastUpdateTime": "\/Date(1670851110597)\/"
        },
        "defaultBranch": "refs/heads/main",
        "size": 1263,
        "remoteUrl": "https://moim@dev.azure.com/moim/Tulsa/_git/Temp",
        "sshUrl": "git@ssh.dev.azure.com:v3/moim/Tulsa/Temp",
        "webUrl": "https://dev.azure.com/moim/Tulsa/_git/Temp",
        "isDisabled": false,
        "isInMaintenance": false
    },
    {
        "id": "d605441d-e795-42cf-929e-fa76b2b3e06b",
        "name": "Tulsa",
        "url": "https://dev.azure.com/moim/85853048-1ab9-4316-a63f-48ed349b7279/_apis/git/repositories/d605441d-e795-42cf-929e-fa76b2b3e06b",
        "project": {
            "id": "85853048-1ab9-4316-a63f-48ed349b7279",
            "name": "Tulsa",
            "description": "BI Engineering teams project",
            "url": "https://dev.azure.com/moim/_apis/projects/85853048-1ab9-4316-a63f-48ed349b7279",
            "state": 1,
            "revision": 438083097,
            "visibility": 0,
            "lastUpdateTime": "\/Date(1670851110597)\/"
        },
        "size": 0,
        "remoteUrl": "https://moim@dev.azure.com/moim/Tulsa/_git/Tulsa",
        "sshUrl": "git@ssh.dev.azure.com:v3/moim/Tulsa/Tulsa",
        "webUrl": "https://dev.azure.com/moim/Tulsa/_git/Tulsa",
        "isDisabled": false,
        "isInMaintenance": false
    }
]
let folders = [{
    name: "Folder 1",
    path: "Folder 1",
    children: [{
        name: "Folder 1.1",
        path: "Folder 1/Folder 1.1",
        children: [{
            name: "Folder 1.1.1",
            path: "Folder 1/Folder 1.1/Folder 1.1.1",
            children: [{
                name: "Folder",
                path: "Folder 1/Folder 1.1/Folder 1.1.1/Folder",
            }]
        }]
    }]
},
{
    name: "Folder 2",
    path: "Folder 2",
    children: [{
        name: "Folder 2.1",
        path: "Folder 2/Folder 2.1",
        children: [{
            name: "Folder 2.1.1",
            path: "Folder 2/Folder 2.1/Folder 2.1.1",
            children: [{
                name: "Folder",
                path: "Folder 2/Folder 2.1/Folder 2.1.1/Folder",
                expanded: true
            }]
        }]
    }]
}];
const fakeIdentitySearchResponse = [
    {
        "entityId": "vss.ds.v1.aad.group.0f7065304b0a487cb67a42a931c54ec5",
        "entityType": "Group",
        "originDirectory": "aad",
        "originId": "0f706530-4b0a-487c-b67a-42a931c54ec5",
        "localDirectory": null,
        "localId": null,
        displayName: "TEST-GROUP-ABC",
        "scopeName": "Default Directory",
        "samAccountName": null,
        "active": null,
        "subjectDescriptor": null,
        "department": null,
        "jobTitle": null,
        "mail": null,
        "mailNickname": "82494be5-5",
        "physicalDeliveryOfficeName": null,
        "signInAddress": null,
        "surname": null,
        "guest": false,
        "telephoneNumber": null,
        "description": null,
        "isMru": false
    },
    {
        "entityId": "vss.ds.v1.aad.group.1c7065304b0a487cb67a42a931c54ec5",
        "entityType": "Group",
        "originDirectory": "aad",
        "originId": "0f706530-4b0a-487c-b67a-42a931c54ec5",
        "localDirectory": null,
        "localId": null,
        displayName: "ADFS-GROUP-TFS",
        "scopeName": "Default Directory",
        "samAccountName": null,
        "active": null,
        "subjectDescriptor": null,
        "department": null,
        "jobTitle": null,
        "mail": null,
        "mailNickname": "82494be5-5",
        "physicalDeliveryOfficeName": null,
        "signInAddress": null,
        "surname": null,
        "guest": false,
        "telephoneNumber": null,
        "description": null,
        "isMru": false
    }
];

const DummyData = {
    identities: fakeIdentitySearchResponse,
    serviceEndpoints: fakeServiceEndpoints,
    variableGroups: fakeVariableGroups,
    environments: fakeEnvironments,
    repositories: fakeRepositories,
    folders: folders,
    areaPaths: fakeAreaPaths,
    iterationPaths: fakeIterationPaths,
    fakeActionRequests: fakeActionRequests,
    globalConfig: fakeGlobalConfig
}
export default DummyData;