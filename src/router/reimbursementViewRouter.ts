import express from 'express';
import * as reimbursementViewService from '../service/reimbursementViewService';

export const reimbursementViewRouter = express.Router();

reimbursementViewRouter.get('/status', (request, response, next) => {
    const status = request.body;
    reimbursementViewService.getReimbursementByStatus(status).then(getstatus => {
        response.status(201);
        response.json(getstatus);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

reimbursementViewRouter.get('/type', (request, response, next) => {
    const type = request.body;
    reimbursementViewService.getReimbursementByStatus(type).then(gettype => {
        response.status(201);
        response.json(gettype);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

reimbursementViewRouter.get('/status_type', (request, response, next) => {
    const statusType = request.body;
    reimbursementViewService.getReimbursementByStatus(statusType).then(getStatusType => {
        response.status(201);
        response.json(getStatusType);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});
