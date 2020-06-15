import express from 'express';

export const homeRouter = express();

const redirectLogin = (request, response, next) => {
    if (!request.session.userName) {
        response.redirect('/login');
    } else {
        next();
    }
}

homeRouter.get('', redirectLogin, (request,response) => {
    const { userName, userEmail,
            userFirstName, userLastName,
            userRole, userId } = response.locals;

    response.send(`
        <h1>Home</h1>
        <a href="/session">Main</a>
        <a href='/reimbursements'>Reimbursements</a>
        <ul>
            <li>username: ${userName}</li>
            <li>Email: ${userEmail}</li>
            <li>Name: ${userFirstName}</li>
            <li>Last Name: ${userLastName}</li>
            <li>Role: ${userRole}</li>
        </ul>
    `);
});
