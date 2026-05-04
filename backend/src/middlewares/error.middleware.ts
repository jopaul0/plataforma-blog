import { Request, Response, NextFunction } from 'express';
import { AppError } from '../lib/error';

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            message: err.message,
            status: err.status
        });
    }

    console.error(`[Error]: ${err.message}`);

    return res.status(500).json({
        message: 'Internal server error',
        status: 500
    });
};