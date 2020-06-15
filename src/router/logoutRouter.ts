import express from 'express';

export const logoutRouter = express();

const redirectLogin = (request, response, next) => {
    // console.log('inside redurect logout')
    // console.log(request.session.userName)
    if (!request.session.userName) {
        // console.log('inside sess username')
        response.redirect('/login');
    } else {
        next();
    }
}

logoutRouter.post('', redirectLogin, (request,response) => {
    request.session.destroy(err => {
        if (err) {
            return response.redirect('/home')
        }

        // response.clearCookie(process.env.SESS_NAME);
        response.redirect('/login');
    })
});

logoutRouter.get('', redirectLogin, (request,response) => {
    request.session.destroy(err => {
        if (err) {
            return response.redirect('/home')
        }

        // response.clearCookie(process.env.SESS_NAME);
        response.redirect('/login');
    })
});
