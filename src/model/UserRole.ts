export class UserRole {
    userRole: string;

    constructor(userRole:string) {
        this.userRole = userRole;
    }

    static from(obj: UserRoleRow): UserRole {
        const userRole = new UserRole(obj.user_role);
        return userRole;
    }
}

export interface UserRoleRow {
    user_role: string;
}