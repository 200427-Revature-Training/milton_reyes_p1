export class User {
    userId: number;
    ersUsername: string;
    ersPassword: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    ersUserRoleId: number;
    userRole: string;

    constructor(
        userId: number,
        ersUsername:string,
        ersPassword: string,
        userFirstName: string,
        userLastName: string,
        userEmail: string,
        ersUserRoleId: number,
        userRole:string) {
            this.userId = userId;
            this.ersUsername = ersUsername;
            this.ersPassword = ersPassword;
            this.userFirstName = userFirstName;
            this.userLastName = userLastName;
            this.userEmail = userEmail;
            this.ersUserRoleId = ersUserRoleId;
            this.userRole = userRole;
    }

    static from(obj: UserRow): User {

        const user = new User(
            obj.id,
            obj.ers_username,
            obj.ers_password,
            obj.user_first_name,
            obj.user_last_name,
            obj.user_email,
            obj.ers_user_role_id,
            obj.user_role);
        return user;
    }
}

export interface UserRow {
    id: number;
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    ers_user_role_id: number;
    user_role: string;
}
