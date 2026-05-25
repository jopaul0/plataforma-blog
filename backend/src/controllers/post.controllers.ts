import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { listPostsSchema } from '../schemas/post.schemas';
import { AppError } from '../lib/error';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = listPostsSchema.safeParse(req.query);

        if (!result.success) {
            const message = result.error.issues.map(err => err.message).join(', ');
            throw new AppError(message, 400);
        }

        const { page, perPage } = result.data;
        const skip = (page - 1) * perPage;

        const [totalItems, posts] = await prisma.$transaction([
            prisma.post.count({
                where: {
                    status: 'PUBLISHED',
                    deletedAt: null
                }
            }),
            prisma.post.findMany({
                where: {
                    status: 'PUBLISHED',
                    deletedAt: null
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: perPage,
            })
        ]);

        const totalPages = Math.ceil(totalItems / perPage);

        return res.json({
            meta: {
                totalItems,
                itemCount: posts.length,
                itemsPerPage: perPage,
                totalPages,
                currentPage: page,
            },
            posts
        });
    } catch (error) {
        next(error);
    }
};