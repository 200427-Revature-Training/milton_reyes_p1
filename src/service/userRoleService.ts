import { UserRole, UserRoleRow } from '../model/UserRole';
import * as userRoleDao from '../dao/UserRoleDao';

export function getAllRoles(): Promise<UserRoleRow[]> {
    return userRoleDao.getAllRoles();
}

export function saveUserRole(userRole: any): Promise<UserRole> {
    const newUserRole = new UserRole(
        userRole.userRole
    );
    if(newUserRole.userRole) {
        return userRoleDao.saveUserRole(newUserRole);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function getRoleName(id: any): Promise<UserRole> {
    return userRoleDao.getRoleName(id);
}
