import express, { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { PORT } from './constants/constants';
import { registerValidator } from './validations/auth';
import { RegisterRequest, RegisterResponse } from './types/Register';
import UserModel from './models/User';
import { User, UserDocumentResult } from './types/User';
import { LoginRequest, LoginResponse } from './types/Login';
import isAuthorized from './utils/isAuthorized';

dotenv.config();

const databaseConnectionUrl: string = process.env.DB_CONNECT as string;
const jwtEncryptKey: string = process.env.JWT_KEY as string;
const jwtTokenDuration: string = process.env.JWT_TOKEN_DURATION as string;


mongoose.connect(databaseConnectionUrl)
    .then((): void => console.info('DB connection successful'))
    .catch(error => console.info('DB connection error', error));

const app: Express = express();


app.use(express.json());



app.post('/auth/register', registerValidator, async (request: Request<{}, {}, RegisterRequest>, response: Response<RegisterResponse>) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({
                success: false,
                error: errors.array().map(err => err.msg)
            });
        }

        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(request.body.password, salt);

        const doc = new UserModel({
            email: request.body.email,
            name: request.body.name,
            passwordHash: hashedPassword,
            avatarUrl: request.body.avatarUrl
        });

        const createdUser: UserDocumentResult = await doc.save() as unknown as UserDocumentResult;

        const token: string = jwt.sign({_id: createdUser._id}, jwtEncryptKey, {expiresIn: jwtTokenDuration});

        const {passwordHash, ...restUserData} = createdUser['_doc'];

        response.json({
            success: true,
            user: restUserData,
            token: token
        });
    } catch (error) {
        console.info(error);
        response.status(500).json({
            success: false,
            errors: ['Unable to register']
        });
    }
});

app.post('/auth/login', async (request: Request<{}, {}, LoginRequest>, response: Response<LoginResponse>) => {
    try {
        const user = await UserModel.findOne({email: request}) as UserDocumentResult;

        if (!user) {
            return response.status(404).json({
                success: false,
                error: 'Email or password is not correct'
            });
        }

        const isValidPass: boolean = await bcrypt.compare(request.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return response.status(401).json({
                success: false,
                error: 'Email or password is not correct'
            });
        }

        const token: string = jwt.sign({_id: user._id}, jwtEncryptKey, {expiresIn: jwtTokenDuration});
        const {passwordHash, ...restUserData} = user['_doc'];

        response.json({
            success: true,
            user: restUserData,
            token: token
        });
    } catch (error) {
        console.info(error);
        response.status(500).json({
            success: false,
            error: 'Unable to login'
        });
    }
});

app.get('/auth/me', isAuthorized, async (request: Request, response: Response) => {
    try {

    } catch (error) {
        console.info(error);
        response.status(500).json({
            success: false,
            error: 'Unable to login'
        });
    }
});



app.listen(PORT, () => {
    console.info('Server listening on port ', PORT);
});
