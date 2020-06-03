import express from 'express';
import * as userRoleService from '../service/userRoleService';

export const userRoleRouter = express.Router();

userRoleRouter.get('', (request, response, next) => {
    userRoleService.getAllRoles().then(userRole => {
        response.set('content-type', 'application/json');
        console.log("------------Get user");
        console.log(userRole);
        response.json(userRole);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

userRoleRouter.post('', (request, response, next) => {
    const userRole = request.body;
    userRoleService.saveUserRole(userRole).then(newUserRole => {
        response.status(201);
        response.json(newUserRole);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});
