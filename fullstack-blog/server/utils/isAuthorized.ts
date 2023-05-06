import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export default (request: Request, response: Response, next: any) => {
    const token: string = (request.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {

    } else {
        response.status(403).json()
    }

    next();
}
