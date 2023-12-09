import Permission from "../Permission";

const UserPermission = Permission.create({
    id: "user-permission",
    label: "User"
})

const RolePermission = Permission.create({
    id: "Role-permission",
    label: "Role"
})

UserPermission.add({
    key: "read",
    value: "read_all",
    title: "Read User",
    subtitle: "You can raed all the users"
})

UserPermission.add({
    key: "write",
    value: "write_user",
    title: "Write User",
    subtitle: "You can create new user"
})

UserPermission.add({
    key: "read",
    value: "Delete_user",
    title: "Delete User",
    subtitle: "You can create Delete user"
})

RolePermission.add({
    key: "read",
    value: "read_all",
    title: "Read Role",
    subtitle: "You can raed all the Roles"
})

RolePermission.add({
    key: "write",
    value: "write_Role",
    title: "Write Role",
    subtitle: "You can create new Role"
})