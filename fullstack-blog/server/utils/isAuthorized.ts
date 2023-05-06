import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { OnlySuccessStatusResponse } from '../types/SuccessResponse';
import { User } from '../types/User';

export default (request: Request, response: Response<OnlySuccessStatusResponse>, next: any) => {
    const token: string = (request.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as Partial<User>;
            (request as Request & { userId: string }).userId = decoded._id as string;
            return next();
        } catch (error) {
            return response.status(403).json({
                success: false,
                error: 'No access'
            });
        }
    } else {
        return response.status(403).json({
            success: false,
            error: 'No access'
        });
    }

    return next();
}
