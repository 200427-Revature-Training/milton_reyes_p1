import express from 'express';
import session from 'express-session';
import * as userService from '../service/userService';
import * as userRoleService from '../service/userRoleService';
import * as argon2 from "argon2";

export const registerRouter = express();

const redirectHome = (request, response, next) => {
    if (request.session.userName) {
        response.redirect('/home')
    } else {
        next()
    }
}

const hash = async (password:string) => {
    try {
        return await argon2.hash(password, {
            hashLength: 50
        });
    } catch (err) {
        console.log(err);
    }
}

registerRouter.get('', redirectHome, (request,response) => {
    response.send(`
    <h1>Register</h1>
    <form method='post' action='./register'>
    <input type='text' name='ersUsername' placeholder='Username' required />
    <input type='password' name='ersPassword' placeholder='Password' required />
    <input type='text' name='userFirstName' placeholder='First Name' required />
    <input type='text' name='userLastName' placeholder='Last Name' required />
    <input type='email' name='userEmail' placeholder='Email' required />
    <input type='text' name='ersUserRoleId' placeholder='RoleId Number' required />
    <input type='submit'>
    </form>
    <a href='/login'>Login</a>
    `);
});

registerRouter.post('', redirectHome, (request,response,next) => {
    // const {username, firstName, lastName, email, password, roleId} = request.body;
    const user = request.body
    if(user.ersUsername && user.ersPassword && user.userFirstName && user.userLastName && user.userEmail  && user.ersUserRoleId) {
        // Lets check if the user exists
        userService.getAllUsers().then(users => {
            response.set('content-type', 'application/json');
            let exists = false;
                // tslint:disable-next-line: prefer-for-of
                for (let i=0; i< users.length; i++) {
                    if (users[i].ersUsername === user.ersUsername || users[i].userEmail === user.userEmail) {
                        // Print some warning message indicating that the user exists
                        exists = true;
                        response.redirect('/register')
                    } else {
                        exists = false;
                    }
                }
            // console.log(exists)
            if (exists === false) {
                hash(user.ersPassword).then(hashed => {
                    user.ersPassword = hashed
                    // console.log(user);
                    userService.saveUser(user).then(newUser => {
                        response.status(201);
                        request.session.userName = newUser.ersUsername
                        // request.session.userId = user.userId
                        request.session.userEmail = newUser.userEmail
                        // request.session.userRole = user.userRole
                        request.session.userFirstName = newUser.userFirstName
                        request.session.userLastName = newUser.userLastName
                        // request.session.userId = user.id
                        // response.json(newUser);
                        userRoleService.getRoleName(newUser.ersUserRoleId).then(roleName => {
                            request.session.userRole = roleName.userRole
                            response.redirect('/home')
                        }).catch(err => console.log(err))
                        // next();
                    }).catch(err => {
                        console.log(err);
                        response.sendStatus(500);
                        next();
                    })
                })
            }
        }).catch(err => {
            response.sendStatus(500);
        });
    }
});
