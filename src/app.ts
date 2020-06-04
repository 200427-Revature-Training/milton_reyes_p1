import express  from 'express';
import { db } from './dao/db';
//import bodyParser from 'body-parser';
import { indexRouter } from './router/indexRouter';
import { userRouter } from './router/userRouter';
import { userRoleRouter } from './router/userRoleRouter';

const app = express();
const port = process.env.port || 3030;

app.set('port', port);
//app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('', indexRouter);
app.use('/users', userRouter);
app.use('/userRoles', userRoleRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});
