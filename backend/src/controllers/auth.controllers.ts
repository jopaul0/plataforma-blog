import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { AppError } from '../lib/error';
import { registerSchema } from '../schemas/auth.schemas';

export const register = async (req: Request, res: Response) => {

    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.issues.map(err => err.message).join(', ');
        throw new AppError(message, 400);
    }
    const { name, username, email, password } = result.data;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
        throw new AppError('Este e-mail já está em uso', 409);
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