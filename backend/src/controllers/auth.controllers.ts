import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { AppError } from '../lib/error';
import { registerSchema, loginSchema } from '../schemas/auth.schemas';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {

    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.issues.map(err => err.message).join(', ');
        throw new AppError(message, 400);
    }
    const { name, username, email, password } = result.data;

    const userExists = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    });

    if (userExists) {
        const field = userExists.email === email ? 'e-mail' : 'nome de usuário';
        throw new AppError(`Este ${field} já está em uso`, 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            username,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
        },
    });

    return res.status(201).json({
        message: 'Usuário criado com sucesso',
        user
    });
};

export const login = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        const message = result.error.issues.map(err => err.message).join(', ');
        throw new AppError(message, 400);
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new AppError('E-mail ou senha incorretos', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError('E-mail ou senha incorretos', 401);
    }

    const token = jwt.sign(
        {},
        process.env.JWT_SECRET || 'default_secret',
        {
            subject: user.id,
            expiresIn: '7d',
        }
    );

    return res.json({
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        },
        token
    });
};