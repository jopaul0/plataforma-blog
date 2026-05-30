import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../@types/auth.types';

export const parseUserOptional = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();

    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        const { sub } = decoded as TokenPayload;
        req.user = { id: sub };
    } catch { }

    return next();
};