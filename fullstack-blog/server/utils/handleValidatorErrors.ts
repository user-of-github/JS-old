import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default (request: Request, response: Response, next: any) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            success: false,
            error: errors.array().map(err => err.msg)
        });
    }

    next();
}
