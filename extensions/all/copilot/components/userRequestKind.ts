
class UserRequestKind {
    public static WorkItemQueryRequest: number = 0;
    public static ResourceProvisionRequest: number = 1;
    public static PermissionChangeRequest: number = 2;
    public static GenerateYAMLPipelineRequest: number = 3;
    public static UnknownRequest: number = 4
}

export default UserRequestKind;