import express from 'express';
import * as userService from '../service/userService';
import * as argon2 from "argon2";

export const loginRouter = express();

const redirectHome = (request, response, next) => {
    if (request.session.userName) {
        response.redirect('/home')
    } else {
        next()
    }
}

const verifyHash = async (hash, password) => {
    try {
        if(await argon2.verify(hash,password)) {
            return true
        }
    } catch (err) {
        console.log(err)
    }
}

loginRouter.get('', redirectHome, (request,response) => {
    response.send(`
    <h1>Login</h1>
    <form method='post' action='./login'>
    <input type='email' name='email' placeholder='Email' required />
    <input type='password' name='password' placeholder='Password' required />
    <input type='submit'>
    </form>
    <a href='/register'>Register</a>
    `);
});

loginRouter.post('', redirectHome, (request,response) => {
    const {email, password} = request.body;
    if (email && password) {
        userService.getUserWithRoleByEmail(email).then(user => {
            if(user) {
                verifyHash(user.ersPassword,password).then((e)=>{
                    if(e){
                        request.session.userName = user.ersUsername
                        // request.session.userId = user.userId
                        request.session.userEmail = user.userEmail
                        request.session.userRole = user.userRole
                        request.session.userFirstName = user.userFirstName
                        request.session.userLastName = user.userLastName
                        response.redirect('/home')
                    } else {
                        response.redirect('/login')
                    }
                })
            } else {
                response.redirect('/login')
            }
        });
    }
});
