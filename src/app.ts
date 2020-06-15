import express  from 'express';
import { db } from './dao/db';


import session from 'express-session';
import * as userService from './service/userService';
import * as argon2 from "argon2";


//import bodyParser from 'body-parser';
import { indexRouter } from './router/indexRouter';
import { userRouter } from './router/userRouter';
import { userRoleRouter } from './router/userRoleRouter';
import { reimbursementViewRouter } from './router/reimbursementViewRouter';
import { sessionRouter } from './router/sessionRouter';
import { reimbursementRouter } from './router/reimbursementRouter';
import { loginRouter } from './router/loginRouter';
import { logoutRouter } from './router/logoutRouter';
import { homeRouter } from './router/homeRouter';
import { registerRouter } from './router/registerRouter';

const app = express();
const port = process.env.port || 3030;

app.set('port', port);
//app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const FIVE_MINUTES = 1000 * 60 * 5;
const SIXTY_MINUTES = 1000 * 60 * 60;

const {
    SESS_LIFETIME = SIXTY_MINUTES,
    SESS_NAME = 'sid',
    SESS_SECRET = 'it\'s a secret',
    NODE_ENV = 'development',
} = process.env;

const IN_PROD = NODE_ENV === 'production';





app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SIXTY_MINUTES,
        sameSite: true,
        secure: IN_PROD

    }
}));

app.use((request, response, next) => {
    // console.log(request.session)
    // console.log('app use session: '+request.session.userName)
    if (request.session.userRole) {
        response.locals.userName = request.session.userName;
        response.locals.userId = request.session.userId;
        response.locals.userEmail = request.session.userEmail;
        response.locals.userRole = request.session.userRole;
        response.locals.userFirstName = request.session.userFirstName;
        response.locals.userLastName = request.session.userLastName;
        // console.log('app use response: '+response.locals.userName)
        next();
    }
    next();
});

//app.use((request,response,next) => {
//    if(request.session.userEmail) {
//        userService.getUserWithRoleByEmail(request.session.userEmail).then(user => {
//            request.session.userName = user.ersUsername
//            request.session.userId = user.userId
//            request.session.userEmail = user.userEmail
//            request.session.userRole = user.userRole
//            request.session.userFirstName = user.userFirstName
//            request.session.userLastName = user.userLastName
//            next();
//        }).catch(err => console.log(err));
//    }
//    next();
//});







//app.use('', indexRouter);
app.use('/users', userRouter);
app.use('/userRoles', userRoleRouter);
app.use('/reimbursements', reimbursementRouter);
app.use('/session', sessionRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/home', homeRouter);
app.use('/register', registerRouter);


process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});
