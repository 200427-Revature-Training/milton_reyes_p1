import express from 'express';
import session from 'express-session';
import * as userService from '../service/userService';
import * as argon2 from "argon2";

export const sessionRouter = express();

const FIVE_MINUTES = 1000 * 60 * 5;
const SIXTY_MINUTES = 1000 * 60 * 60;

const {
    SESS_LIFETIME = SIXTY_MINUTES,
    SESS_NAME = 'sid',
    SESS_SECRET = 'it\'s a secret',
    NODE_ENV = 'development',
} = process.env;

const IN_PROD = NODE_ENV === 'production';

//Compare/Replaced to users in DB
const dummyUsers = [
   { id:1,name:'wolf',email:'wolf@email.com',password:'secret' },
   { id:2,name:'wolf2',email:'wolf2@email.com',password:'secret' },
   { id:3,name:'wolf3',email:'wolf3@email.com',password:'secret' }
]


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

const redirectLogin = (request, response, next) => {
    //if (!request.session.userId) {
    if (!request.session.userName) {
        response.redirect('/session/login');
    } else {
        next();
    }
}

const redirectHome = (request, response, next) => {
    if (request.session.userName) {
        response.redirect('/session/home')
    } else {
        next()
    }
}

const hash = async (password:string) => {
    try {
        return await argon2.hash(password, {
            hashLength: 50
        });
    } catch (err) {
        console.log(err);
    }
}

const verifyHash = async (hash, password) => {
    try {
        if(await argon2.verify(hash,password)) {
            // console.log('verified')
            return true
        }
    } catch (err) {
        console.log(err)
    }
}


// sessionRouter.use((request,response,next) => {
//     const {userName } = request.session;
//     if (userName) {
//         // console.log(userName);
//         userService.getUserByUsername(userName).then(user => {
//             // console.log(user);
//             response.locals.user = user;
//             console.log('here first')
//             console.log(response.locals.user)
//             next();
//         })
//     }
//     next();
// })

sessionRouter.get('', (request,response) => {
    const { userName } = request.session;
    // console.log(userName);
    // request.session.userId = 1;
    // console.log(request.session);
    response.send(`
    <h1>INDEX</h1>
        ${userName  ? `
        <a href='/session/home'>Home</a>
        <a href='/reimbursements'>Reimbursements</a>
        <form method='post' action='/logout'>
        <button>Logout</button>
        </form>
        `:`
        <a href='/session/login'>Login</a>
        <a href='/session/register'>Register</a>
        `}
    `)
});

sessionRouter.get('/home', redirectLogin, (request,response) => {
    const { userName, userEmail,
            userFirstName, userLastName,
            userRole, userId } = request.session
    // console.log(user);
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
            <li>userId: ${userId}</li>
        </ul>
    `);
});



sessionRouter.get('/login', redirectHome, (request,response) => {
    response.send(`
    <h1>Login</h1>
    <form method='post' action='./login'>
    <input type='email' name='email' placeholder='Email' required />
    <input type='password' name='password' placeholder='Password' required />
    <input type='submit'>
    </form>
    <a href='/session/register'>Register</a>
    `);
});

sessionRouter.get('/register', redirectHome, (request,response) => {
    response.send(`
    <h1>Register</h1>
    <form method='post' action='./register'>
    <input type='text' name='ersUsername' placeholder='Username' required />
    <input type='password' name='ersPassword' placeholder='Password' required />
    <input type='text' name='userFirstName' placeholder='First Name' required />
    <input type='text' name='userLastName' placeholder='Last Name' required />
    <input type='email' name='userEmail' placeholder='Email' required />
    <input type='text' name='ersUserRoleId' placeholder='RoleId Number' required />
    <input type='submit'>
    </form>
    <a href='/session/login'>Login</a>
    `);
});

sessionRouter.post('/login', redirectHome, (request,response) => {
    const {email, password} = request.body;
    if (email && password) {
        userService.getUserWithRoleByEmail(email).then(user => {
            if(user) {
            // hash(password).then(hashed => {
                verifyHash(user.ersPassword,password).then((e)=>{
                    if(e){
                        request.session.userName = user.ersUsername
                        request.session.userId = user.userId
                        // request.session.userName = user.ersUsername
                        request.session.userEmail = user.userEmail
                        // request.session.userId = user.userId
                        request.session.userRole = user.userRole
                        request.session.userFirstName = user.userFirstName
                        request.session.userLastName = user.userLastName
                        response.redirect('/session/home')
                    } else {
                        response.redirect('/session/login')
                    }
                })
            // })
            } else {
                response.redirect('/session/login')
            }
        });
    }
});

sessionRouter.post('/register', redirectHome, (request,response,next) => {
    // const {username, firstName, lastName, email, password, roleId} = request.body;
    const user = request.body
    if(user.ersUsername && user.ersPassword && user.userFirstName && user.userLastName && user.userEmail  && user.ersUserRoleId) {
        // Lets check if the user exists
        userService.getAllUsers().then(users => {
            response.set('content-type', 'application/json');
            let exists = false;
                // tslint:disable-next-line: prefer-for-of
                for (let i=0; i< users.length; i++) {
                    if (users[i].ersUsername === user.ersUsername || users[i].userEmail === user.userEmail) {
                        // Print some warning message indicating that the user exists
                        exists = true;
                        response.redirect('/session/register')
                    } else {
                        exists = false;
                    }
                }
            // console.log(exists)
            if (exists === false) {
                hash(user.ersPassword).then(hashed => {
                    user.ersPassword = hashed
                    //console.log(user);
                    userService.saveUser(user).then(newUser => {
                        response.status(201);
                        request.session.userName = user.ersUsername
                        //request.session.userId = user.id
                        //response.json(newUser);
                        response.redirect('/session/home')
                        //next();
                    }).catch(err => {
                        console.log(err);
                        response.sendStatus(500);
                        next();
                    })
                })
            }
        }).catch(err => {
            response.sendStatus(500);
        });
    }
});

sessionRouter.post('/logout', redirectLogin, (request,response) => {
    request.session.destroy(err => {
        if (err) {
            return response.redirect('/session/home')
        }

        response.clearCookie(SESS_NAME);
        response.redirect('/session/login');
    })
});


