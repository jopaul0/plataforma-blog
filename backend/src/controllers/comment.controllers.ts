import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { createCommentSchema } from '../schemas/comment.schemas';
import { AppError } from '../lib/error';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: postId } = req.params as { id: string };
        const authorId = req.user?.id;
        if (!authorId) throw new AppError('Usuário não autenticado', 401);

        const result = createCommentSchema.safeParse(req.body);
        if (!result.success) throw new AppError(result.error.issues.map(err => err.message).join(', '), 400);

        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post || post.deletedAt) throw new AppError('Postagem original não encontrada', 404);

        const comment = await prisma.comment.create({
            data: { content: result.data.content, postId, authorId },
            include: { author: { select: { id: true, name: true, username: true } } }
        });

        return res.status(201).json({ message: 'Comentário enviado!', comment });
    } catch (error) {
        next(error);
    }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: postId } = req.params as { id: string };

        const comments = await prisma.comment.findMany({
            where: { postId, deletedAt: null },
            include: { author: { select: { id: true, name: true, username: true } } },
            orderBy: { createdAt: 'asc' }
        });

        return res.json({ comments });
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        const authorId = req.user?.id;
        if (!authorId) throw new AppError('Usuário não autenticado', 401);

        const comment = await prisma.comment.findUnique({ where: { id } });
        if (!comment || comment.deletedAt) throw new AppError('Comentário não encontrado', 404);
        if (comment.authorId !== authorId) throw new AppError('Ação não permitida', 403);

        await prisma.comment.update({ where: { id }, data: { deletedAt: new Date() } });
        return res.json({ message: 'Comentário removido com sucesso!' });
    } catch (error) {
        next(error);
    }
};