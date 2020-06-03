import express from 'express';
import * as userService from '../service/userService';

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
    const user = request.body;
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
