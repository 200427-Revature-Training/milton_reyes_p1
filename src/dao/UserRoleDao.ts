import { db } from '../dao/db';
import { UserRole, UserRoleRow } from '../model/UserRole';

export async function getAllRoles(): Promise<UserRoleRow[]> {
    const sql = `SELECT * FROM ers_user_roles`;
    const result = await db.query<UserRoleRow>(sql, []);
    return result.rows;
}

export function saveUserRole(userRole: UserRole): Promise<UserRole> {
    const sql = `INSERT INTO ers_user_roles (user_role) VALUES ($1) RETURNING *`;
    return db.query<UserRoleRow>(sql, [userRole.userRole]).then(result =>
        result.rows.map(row => UserRole.from(row))[0]);
}

export async function getRoleName(roleId: UserRole): Promise<UserRole> {
    const sql = `SELECT user_role FROM ers_user_roles WHERE id = $1`;
    const result = await db.query<UserRoleRow>(sql, [roleId]);
    return result.rows.map(row => UserRole.from(row))[0];
}
