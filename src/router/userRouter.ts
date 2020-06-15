import express from 'express';
import * as userService from '../service/userService';
import * as argon2 from "argon2";

export const userRouter = express.Router();

userRouter.get('', (request, response, next) => {
    userService.getAllUsers2().then(user => {
        response.set('content-type', 'application/json');
        console.log("------------Get user");
        console.log(user);
        response.json(user);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

userRouter.post('', (request, response, next) => {
    console.log("Inside post");
    const user = request.body;
    console.log(user.ersPassword);
    hash(user.ersPassword).then(hashed => {
        user.ersPassword = hashed;
        console.log('hashed: '+user.ersPassword);
        console.log(user);
        userService.saveUser(user).then(newUser => {
            response.status(201);
            response.json(newUser);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
    });
});

const hash = async (password:string) => {
    try {
        return await argon2.hash(password, {
            hashLength: 50
        });
    } catch (err) {
        console.log(err);
    }
}
