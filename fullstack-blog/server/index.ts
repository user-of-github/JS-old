import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PORT } from './constants/constants';
import * as Validator from './validators';
import isAuthorized from './utils/isAuthorized';
import * as UserController from './controllers/UserController';


dotenv.config();

const databaseConnectionUrl: string = process.env.DB_CONNECT as string;

mongoose.connect(databaseConnectionUrl)
    .then((): void => console.info('DB connection successful'))
    .catch(error => console.info('DB connection error', error));

const app: Express = express();


app.use(express.json());


app.post('/auth/register', Validator.registerValidator, UserController.register);
app.post('/auth/login', Validator.loginValidator, UserController.logIn);
app.get('/auth/me', isAuthorized, UserController.getMe);


app.listen(PORT, (): void => {
    console.info('Server listening on port ', PORT);
});
