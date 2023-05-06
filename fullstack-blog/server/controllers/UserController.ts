import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { RegisterRequest, RegisterResponse } from '../types/Register';
import { validationResult } from 'express-validator';

import UserModel from '../models/User';
import { UserDocumentResult } from '../types/User';
import { LoginRequest, LoginResponse } from '../types/Login';
import { AboutMeResponse } from '../types/Me';


const jwtEncryptKey: string = process.env.JWT_KEY as string;
const jwtTokenDuration: string = process.env.JWT_TOKEN_DURATION as string;

export const register = async (request: Request<{}, {}, RegisterRequest>, response: Response<RegisterResponse>) => {
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
            error: ['Unable to register']
        });
    }
};


export const logIn = async (request: Request<{}, {}, LoginRequest>, response: Response<LoginResponse>) => {
    try {
        const user = await UserModel.findOne({email: request.body.email}) as UserDocumentResult;

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
};

export const getMe = async (request: Request, response: Response<AboutMeResponse>) => {
    try {
        const user = await UserModel.findById((request as Request & { userId: string }).userId) as UserDocumentResult;
        const {passwordHash, ...restUserData} = user['_doc'];

        response.json({
            success: true,
            user: restUserData
        });
    } catch (error) {
        console.info(error);
        response.status(500).json({
            success: false,
            error: 'Unable to login'
        });
    }
};
