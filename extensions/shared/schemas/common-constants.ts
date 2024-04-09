
import { IRoleDefinition } from "./schemas";

export const CommonConstants = {
    Tabs: {
        General: { id: 'general', label: 'General', iconName: 'Home' },
        Git: { id: 'repository', label: 'Repository', iconName: 'GitLogo' },
        Security: { id: 'security', label: 'Security', iconName: 'PeopleSettings' },
        ServiceEndpoint: { id: 'serviceEndpoint', label: 'Service Connections', iconName: 'Deploy'},
        Environment: { id: 'environment', label: 'Environments', iconName: 'ServerEnviroment'},
        Library: { id: 'libraries', label: 'Libraries', iconName: 'Library'},
        Pipeline: { id: 'pipelines', label: 'Pipelines', iconName: 'Rocket'},

        Release: { id: 'release', label: 'Releases', iconName: 'Rocket'},
        Build: { id: 'build', label: 'Builds', iconName: 'Build'}
    }
};

export const BuiltInMenuIDs = {
    NEW_SUB_FOLDER: { id: "newSubFolder", label: "New child" },
    DELETE_FOLDER:  { id: "deleteFolder", label: "Delete" },
    MODIFY_FOLDER:  { id: "modifyFolder", label: "Modify" },
    DIVIDER: { id: "divider", label: "Divider" },
    MANAGE_PERMISSION: { id: "managePermission", label: "Manage Permission" },
};

export const BuiltInKinds = {
    AREA: "AREA",
    SQUAD: "SQUAD",
    APPLICATION: "APPLICATION",
    ZONE: "ZONE",
    GENERIC: "GENERIC",

    supportedKinds: ["AREA", "SQUAD", "APPLICATION", "ZONE", "GENERIC"],    
};

export const ReleasePermissions = [
    {
        displayName: "Administer release permissions",
        bit: 512
    },
    {
        displayName: "Create releases",
        bit: 64
    },
    {
        displayName: "Delete release pipeline",
        bit: 4
    },
    {
        displayName: "Delete release stage",
        bit: 256
    },
    {
        displayName: "Delete releases",
        bit: 1024
    },
    {
        displayName: "Edit release pipeline",
        bit: 2
    },
    {
        displayName: "Edit release stage",
        bit: 128
    },
    {
        displayName: "Manage deployments",
        bit: 2048
    },
    {
        displayName: "Manage release approvers",
        bit: 8
    },
    {
        displayName: "Manage releases",
        bit: 16
    },
    {
        displayName: "View release pipeline",
        bit: 1
    },
    {
        displayName: "View releases",
        bit: 32
    }
];

export const BuildPermissions = [
    {
        displayName: "Administer build permissions",
        bit: 16384
    },
    {
        displayName: "Delete build pipeline",
        bit: 4096
    },
    {
        displayName: "Delete builds",
        bit: 8
    },
    {
        displayName: "Destroy builds",
        bit: 32
    },
    {
        displayName: "Edit build pipeline",
        bit: 2048
    },
    {
        displayName: "Edit build quality",
        bit: 2
    },
    {
        displayName: "Manage build qualities",
        bit: 16
    },
    {
        displayName: "Manage build queue",
        bit: 256
    },
    {
        displayName: "Override check-in validation by build",
        bit: 8192
    },
    {
        displayName: "Queue builds",
        bit: 128
    },
    {
        displayName: "Retain indefinitely",
        bit: 4
    },
    {
        displayName: "Stop builds",
        bit: 512
    },
    {
        displayName: "Update build information",
        bit: 64
    },
    {
        displayName: "View build pipeline",
        bit: 1024
    },
    {
        displayName: "View builds",
        bit: 1
    }
];

export const BuiltInRepositoryPermissions = [
    {
        displayName: "Bypass policies when completing pull requests",
        bit: 32768
    },
    {
        displayName: "Bypass policies when pushing",
        bit: 128
    },
    {
        displayName: "Contribute",
        bit: 4
    },
    {
        displayName: "Contribute to pull requests",
        bit: 16384
    },
    {
        displayName: "Create branch",
        bit: 16
    },
    {
        displayName: "Create repository",
        bit: 256
    },
    {
        displayName: "Create tag",
        bit: 32
    },
    {
        displayName: "Delete or disable repository",
        bit: 512,
    },
    {
        displayName: "Edit policies",
        bit: 2048,
    },
    {
        displayName: "Force push (rewrite history, delete branches and tags)",
        bit: 8
    },
    {
        displayName: "Manage notes",
        bit: 64
    },
    {
        displayName: "Manage permissions",
        bit: 8192
    },
    {
        displayName: "Read",
        bit: 2
    },
    {
        displayName: "Remove others' locks",
        bit: 4096
    },
    {
        displayName: "Rename repository",
        bit: 1024
    }
];

export const ServiceEndpointRoles: IRoleDefinition[] = [
    {
        displayName: "Administrator",
        name: "Administrator",
        allowPermissions: 3,
        denyPermissions: 0,
        identifier: "distributedtask.serviceendpointrole.Administrator",
        description: "Administrator can use and manage the service connection.",
        scope: "distributedtask.serviceendpointrole"
    },
    {
        displayName: "User",
        name: "User",
        allowPermissions: 1,
        denyPermissions: 0,
        identifier: "distributedtask.serviceendpointrole.User",
        description: "User can use, but cannot manage the service connection. ",
        scope: "distributedtask.serviceendpointrole"
    },
    {
        displayName: "Reader",
        name: "Reader",
        allowPermissions: 16,
        denyPermissions: 0,
        identifier: "distributedtask.project.serviceendpointrole.Reader",
        description: "User can read the service connection.",
        scope: "distributedtask.project.serviceendpointrole"
    }
];


export const EnvironmentRoles: IRoleDefinition[] = [
    {
        displayName: "Administrator",
        name: "Administrator",
        allowPermissions: 27,
        denyPermissions: 0,
        identifier: "distributedtask.environmentreferencerole.Administrator",
        description: "Administrator can administer permissions, manage, view and use an environment.",
        scope: "distributedtask.environmentreferencerole"
    },
    {
        displayName: "User",
        name: "User",
        allowPermissions: 17,
        denyPermissions: 0,
        identifier: "distributedtask.environmentreferencerole.User",
        description: "User can view the environment and use it in a pipeline.",
        scope: "distributedtask.environmentreferencerole"
    },
    {
        displayName: "Reader",
        name: "Reader",
        allowPermissions: 1,
        denyPermissions: 0,
        identifier: "distributedtask.environmentreferencerole.Reader",
        description: "Reader can only view the environment.",
        scope: "distributedtask.environmentreferencerole"
    }
];

export const LibraryRoles: IRoleDefinition[] = [
    {
        displayName: "Administrator",
        name: "Administrator",
        allowPermissions: 19,
        denyPermissions: 0,
        identifier: "distributedtask.variablegroup.Administrator",
        description: "Administrator can use and manage the library items.",
        scope: "distributedtask.variablegroup"
    },
    {
        displayName: "User",
        name: "User",
        allowPermissions: 17,
        denyPermissions: 0,
        identifier: "distributedtask.variablegroup.User",
        description: "User can use, but cannot manage the library items.",
        scope: "distributedtask.variablegroup"
    },
    {
        displayName: "Reader",
        name: "Reader",
        allowPermissions: 1,
        denyPermissions: 0,
        identifier: "distributedtask.variablegroup.Reader",
        description: "Reader can only view the library items.",
        scope: "distributedtask.variablegroup"
    }
];

export default { CommonConstants };