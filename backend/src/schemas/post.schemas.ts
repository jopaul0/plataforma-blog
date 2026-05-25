import { z } from 'zod';

export const listPostsSchema = z.object({
    page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val, 10)) : 1),
    perPage: z.string().optional().transform(val => val ? Math.max(1, parseInt(val, 10)) : 10),
});

export const createPostSchema = z.object({
    title: z.string({
    }).min(5, 'O título deve ter pelo menos 5 caracteres').max(100, 'O título deve ter no máximo 100 caracteres'),
    content: z.string({
    }).min(10, 'O conteúdo deve ter pelo menos 10 caracteres'),
    status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('DRAFT'),
});