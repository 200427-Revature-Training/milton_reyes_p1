export class User {
    ersUsername: string;
    ersPassword: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    ersUserRoleId: number;

    constructor(
        ersUsername:string,
        ersPassword: string,
        userFirstName: string,
        userLastName: string,
        userEmail: string,
        ersUserRoleId: number) {
            this.ersUsername = ersUsername;
            this.ersPassword = ersPassword;
            this.userFirstName = userFirstName;
            this.userLastName = userLastName;
            this.userEmail = userEmail;
            this.ersUserRoleId = ersUserRoleId;
    }

    static from(obj: UserRow): User {
        const user = new User(
            obj.ers_username,
            obj.ers_password,
            obj.user_first_name,
            obj.user_last_name,
            obj.user_email,
            obj.ers_user_role_id);
        return user;
    }
}

export interface UserRow {
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    ers_user_role_id: number;
}