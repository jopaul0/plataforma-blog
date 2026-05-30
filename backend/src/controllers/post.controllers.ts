import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { listPostsSchema, createPostSchema, updatePostSchema } from '../schemas/post.schemas';
import { AppError } from '../lib/error';
import { generateSlug } from '../utils/generateSlug';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = listPostsSchema.safeParse(req.query);
        if (!result.success) {
            const message = result.error.issues.map(err => err.message).join(', ');
            throw new AppError(message, 400);
        }

        const { page, perPage } = result.data;
        const skip = (page - 1) * perPage;
        const currentUserId = req.user?.id;

        const [totalItems, posts] = await prisma.$transaction([
            prisma.post.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
            prisma.post.findMany({
                where: { status: 'PUBLISHED', deletedAt: null },
                include: {
                    author: { select: { id: true, name: true, username: true } },
                    _count: { select: { likes: true } }, // Task 17-1
                    likes: currentUserId ? { where: { userId: currentUserId } } : false
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: perPage,
            })
        ]);

        const formattedPosts = posts.map(post => ({
            ...post,
            likesCount: post._count.likes,
            likedByMe: currentUserId ? post.likes.length > 0 : false,
            likes: undefined,
            _count: undefined
        }));

        return res.json({
            meta: { totalItems, itemCount: posts.length, itemsPerPage: perPage, totalPages: Math.ceil(totalItems / perPage), currentPage: page },
            posts: formattedPosts
        });
    } catch (error) {
        next(error);
    }
};

export const getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorId = req.user?.id;
        if (!authorId) throw new AppError('Usuário não autenticado', 401);

        const posts = await prisma.post.findMany({
            where: { authorId, deletedAt: null },
            include: {
                author: { select: { id: true, name: true, username: true } },
                _count: { select: { likes: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        const formattedPosts = posts.map(post => ({
            ...post,
            likesCount: post._count.likes,
            _count: undefined
        }));

        return res.json({ posts: formattedPosts });
    } catch (error) {
        next(error);
    }
};

export const getPostByUsernameAndSlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, slug } = req.params as { username: string; slug: string };
        const currentUserId = req.user?.id;

        const post = await prisma.post.findFirst({
            where: { slug, status: 'PUBLISHED', deletedAt: null, author: { username } },
            include: {
                author: { select: { id: true, name: true, username: true } },
                _count: { select: { likes: true } },
                likes: currentUserId ? { where: { userId: currentUserId } } : false
            }
        });

        if (!post) throw new AppError('Post não encontrado', 404);

        return res.json({
            ...post,
            likesCount: post._count.likes,
            likedByMe: currentUserId ? post.likes.length > 0 : false,
            likes: undefined,
            _count: undefined
        });
    } catch (error) {
        next(error);
    }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        const post = await prisma.post.findUnique({
            where: { id },
            include: { author: { select: { id: true, name: true, username: true } } }
        });

        if (!post || post.deletedAt) throw new AppError('Artigo não encontrado', 404);
        return res.json(post);
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = createPostSchema.safeParse(req.body);
        if (!result.success) throw new AppError(result.error.issues.map(err => err.message).join(', '), 400);

        const { title, content, status } = result.data;
        const authorId = req.user?.id;
        if (!authorId) throw new AppError('Usuário não autenticado', 401);

        let slug = generateSlug(title);
        const existingPost = await prisma.post.findUnique({ where: { authorId_slug: { authorId, slug } } });
        if (existingPost) slug = `${slug}-${Date.now().toString().slice(-4)}`;

        const newPost = await prisma.post.create({
            data: { title, slug, content, status, authorId },
            include: { author: { select: { id: true, name: true, username: true } } }
        });

        return res.status(201).json({ message: 'Post criado com sucesso!', post: newPost });
    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        const authorId = req.user?.id;
        if (!authorId) throw new AppError('Usuário não autenticado', 401);

        const result = updatePostSchema.safeParse(req.body);
        if (!result.success) throw new AppError(result.error.issues.map(err => err.message).join(', '), 400);

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post || post.deletedAt) throw new AppError('Post não encontrado', 404);
        if (post.authorId !== authorId) throw new AppError('Você não tem permissão para editar este post', 403);

        const { title, content, status } = result.data;
        const updateData: any = { content, status };

        if (title) {
            updateData.title = title;
            let newSlug = generateSlug(title);
            const existingPost = await prisma.post.findUnique({ where: { authorId_slug: { authorId, slug: newSlug } } });
            if (existingPost && existingPost.id !== id) newSlug = `${newSlug}-${Date.now().toString().slice(-4)}`;
            updateData.slug = newSlug;
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: updateData,
            include: { author: { select: { id: true, name: true, username: true } } }
        });

        return res.json({ message: 'Post atualizado com sucesso!', post: updatedPost });
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        const authorId = req.user?.id;
        if (!authorId) throw new AppError('Usuário não autenticado', 401);

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post || post.deletedAt) throw new AppError('Post não encontrado', 404);
        if (post.authorId !== authorId) throw new AppError('Você não tem permissão para deletar este post', 403);

        await prisma.post.update({ where: { id }, data: { deletedAt: new Date() } });
        return res.json({ message: 'Artigo removido com sucesso!' });
    } catch (error) {
        next(error);
    }
};

export const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: postId } = req.params as { id: string };
        const userId = req.user?.id;
        if (!userId) throw new AppError('Usuário não autenticado', 401);

        const existingLike = await prisma.like.findUnique({
            where: { userId_postId: { userId, postId } }
        });

        if (existingLike) {
            await prisma.like.delete({ where: { id: existingLike.id } });
            return res.json({ liked: false, message: 'Curtida removida' });
        }

        await prisma.like.create({ data: { userId, postId } });
        return res.json({ liked: true, message: 'Conteúdo curtido com sucesso' });
    } catch (error) {
        next(error);
    }
};