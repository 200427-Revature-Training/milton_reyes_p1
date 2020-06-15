import express from 'express';
import session from 'express-session';

export const sessionRouter = express();

const SIXTY_MINUTES = 1000 * 60 * 60;

const {
    SESS_LIFETIME = SIXTY_MINUTES,
    SESS_NAME = 'sid',
    SESS_SECRET = 'it\'s a secret',
    NODE_ENV = 'development',
} = process.env;

const IN_PROD = NODE_ENV === 'production';


sessionRouter.use(session({
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






sessionRouter.get('', (request,response) => {
    const { userName } = request.session;
    // console.log(userName);
    // request.session.userId = 1;
    // console.log(request.session);
    response.send(`
    <h1>INDEX</h1>
        ${userName  ? `
        <a href='/home'>Home</a>
        <a href='/reimbursements'>Reimbursements</a>
        <form method='post' action='/logout'>
        <button>Logout</button>
        </form>
        `:`
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
        `}
    `)
});
