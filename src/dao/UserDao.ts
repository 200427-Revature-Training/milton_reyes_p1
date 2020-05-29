import { db } from '../dao/db';
import { User, UserRow } from '../model/User';

export function getAllUsers(): Promise<User[]> {
    const sql = `SELECT * from ers_users`;

    return db.query<UserRow>(sql, []).then(result => {
        const rows: UserRow[] = result.rows;

        const users: User[] = rows.map(row => User.from(row));
        return users;
    });
}

export function getUserByEmail(email: string): Promise<User> {
    const sql = `SELECT * FROM ers_users WHERE user_email = $1`;

    return db.query<UserRow>(sql, [email])
        .then(result => result.rows.map(row => User.from(row))[0]);
}

export function getUserByUsername(username: string): Promise<User> {
    const sql = `SELECT * FROM ers_users WHERE ers_username = $1`;

    return db.query<UserRow>(sql, [username])
        .then(result => result.rows.map(row => User.from(row))[0]);
}

export function getUserById(id: number): Promise<User> {
    const sql = `SELECT * FROM ers_users WHERE id = $1`;

    return db.query<UserRow>(sql, [id])
        .then(result => result.rows.map(row => User.from(row))[0]);
}

export function saveUser(user: User): Promise<User> {
    const sql = `INSERT INTO ers_users (ers_username,ers_password,user_first_name,user_last_name,user_email,ers_user_role_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

    const params = [user.ersUsername,
                    user.ersPassword,
                    user.userFirstName,
                    user.userLastName,
                    user.userEmail,
                    user.ersUserRoleId];

    return db.query<UserRow>(sql, params).then(result =>
        result.rows.map(row => User.from(row))[0]);
}

export function patchUser(user: User): Promise<User> {
    const sql  = `UPDATE ers_users SET ers_username = COALESCE($1, ers_username) \
,ers_password = COALESCE($2, ers_password) \
,user_first_name = COALESCE($3, user_first_name) \
,user_last_name = COALESCE($4, user_last_name) \
,user_email = COALESCE($5, user_email) \
,ers_user_role_id = COALESCE($6, ers_user_role_id) \
WHERE user_email = $5 RETURNING *`;

    const params = [user.ersUsername,
                    user.ersPassword,
                    user.userFirstName,
                    user.userLastName,
                    user.userEmail,
                    user.ersUserRoleId];

    return db.query<UserRow>(sql, params)
        .then(result => result.rows.map(row => User.from(row))[0]);
}
