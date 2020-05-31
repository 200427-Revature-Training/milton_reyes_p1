import express from 'express';
import { db } from './dao/db';
import { userRouter } from './router/userRouter';

const app = express();
const port = process.env.port || 3030;

app.set('port', port);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//app.use('', indexRouter);
app.use('/users', userRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});
