import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../lib/AppError';
import { TokenPayload } from '../@types/token';

export const isAuthenticated = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token não enviado', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, process.env.JWT_SECRET || 'default_secret');

        const { sub } = decoded as TokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Token inválido ou expirado', 401);
    }
};