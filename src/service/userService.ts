import { User } from '../model/User';
import * as userDao from '../dao/UserDao';

export function getAllUsers(): Promise<User[]> {
    return userDao.getAllUsers();
}

export function getAllUsers2(): Promise<User[]> {
    return userDao.getAllUsers2();
}

export function getUserByEmail(email: string): Promise<User> {
    return userDao.getUserByEmail(email);
}

export function getUserByUsername(username: string): Promise<User> {
    return userDao.getUserByUsername(username);
}

export function getUserById(id: number): Promise<User> {
    return userDao.getUserById(id);
}

export function patchUser(input: any): Promise<User> {
    const user = new User(
        input.ersUsername, input.ersPassword,
        input.userFirstName, input.userLastName,
        input.userEmail, input.ersUserRoleId
    );

    if(!user.userEmail) {
        throw new Error('400');
    }

    return userDao.patchUser(user);
}

export function saveUser(user: any): Promise<User> {
    console.log("Inside saveuser service");
    const newUser = new User(
        user.ersUsername, user.ersPassword,
        user.userFirstName, user.userLastName,
        user.userEmail, user.ersUserRoleId
    );
    if (newUser.ersUsername && newUser.ersPassword &&
        newUser.userFirstName && newUser.userLastName &&
        newUser.userEmail && newUser.ersUserRoleId) {
            return userDao.saveUser(newUser);
        } else {
            return new Promise((resolve, reject) => reject(422));
        }
}

interface Exists {
    exists: boolean;
}
