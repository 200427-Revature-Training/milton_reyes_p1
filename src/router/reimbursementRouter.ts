import express from 'express';
import session from 'express-session';
import * as reimbursementService from '../service/reimbursementViewService';
import bodyParser from 'body-parser';
import { type } from 'os';
import { ReimbursementViewRow } from '../model/ReimbursementView';
const path = require('path');


export const reimbursementRouter = express.Router();

const redirectLogin = (request, response, next) => {
    if (!request.session.userName) {
        response.redirect('/login');
    } else {
        next();
    }
}

// reimbursementRouter.use()

//const reimbursements = (request,response,next) => {
//    const { userRole } = response.locals;
//    if(userRole==='Finance Manager') {
//    reimbursementService.getAllReimbursements().then(obj => {
//        const amounts = obj.map(e => `
//        <tr><td>${e.reimb_amount}</td></tr>
//        <tr><td>${e.reimb_submitted}</td></tr>
//        <tr><td>${e.reimb_resolved}</td></tr>
//        <tr><td>${e.reimb_description}</td></tr>
//        <tr><td>${e.reimb_receipt}</td></tr>
//        <tr><td>${e.ers_reimbursement_status_id}</td></tr>
//        <tr><td>${e.ers_reimbursement_type_id}</td></tr>
//        <tr><td>${e.reimb_author}</td></tr>
//        <tr><td>${e.reimb_resolver}</td></tr>
//        `);
//        response.locals.amounts = amounts
//        console.log(response.locals.amounts)
//        console.log('before use next')
//        next();
//    })
//}else{next();}
//}


/*
//reimbursementRouter.use((request,response,next) => {
//    reimbursementService.getAllReimbursements().then(obj => {
//        const amounts = obj.map(e => `
//        <tr><td>${e.reimb_amount}</td></tr>
//        <tr><td>${e.reimb_submitted}</td></tr>
//        <tr><td>${e.reimb_resolved}</td></tr>
//        <tr><td>${e.reimb_description}</td></tr>
//        <tr><td>${e.reimb_receipt}</td></tr>
//        <tr><td>${e.ers_reimbursement_status_id}</td></tr>
//        <tr><td>${e.ers_reimbursement_type_id}</td></tr>
//        <tr><td>${e.reimb_author}</td></tr>
//        <tr><td>${e.reimb_resolver}</td></tr>
//        `);
//        response.locals.amounts = amounts
//        console.log(response.locals.amounts)
//        console.log('before use next')
//        next();
//    })
//    next();
//});
*/

/*
reimbursementRouter.get('', redirectLogin, reimbursements, (request,response,next) => {
    const { userRole } = response.locals;
    const { amounts } = response.locals;
    console.log('userRole')
    console.log(userRole);
    console.log('amounts')
    console.log(amounts);
    
    //reimbursementService.getAllReimbursements().then(obj => {
        console.log('inside reimb service')

        

        
        response.send(`
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Reimbursements</li>

        <table id='table-container'>
            <tr>
                <th>amounts</th>
            </tr>
        </table>
        <script>
        document.getElementById('table-container')
        </script>

</body>

</html>
        `)
*/


/*
        const amounts = obj.map(e => `
        <tr><td>${e.reimb_amount}</td></tr>
        <tr><td>${e.reimb_submitted}</td></tr>
        <tr><td>${e.reimb_resolved}</td></tr>
        <tr><td>${e.reimb_description}</td></tr>
        <tr><td>${e.reimb_receipt}</td></tr>
        <tr><td>${e.ers_reimbursement_status_id}</td></tr>
        <tr><td>${e.ers_reimbursement_type_id}</td></tr>
        <tr><td>${e.reimb_author}</td></tr>
        <tr><td>${e.reimb_resolver}</td></tr>
        `);
        
        
        console.log(amounts);

        response.send(`hello`);
        const table = document.getElementById('table-container');
        */
        
        // response.send(`
        //     <h1>Reimbursements</h1>
        //     <a href="/session">Main</a>
        //     <ul>
        //         <li>Role: ${userRole}</li>
        //     </ul>
        //     <ol>
        //         <li>${reimb.map(e=>e.author.valueOf())}</li>
        //     </ol>
        // `)
    //})
//})
