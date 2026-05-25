import { z } from 'zod';

export const listPostsSchema = z.object({
    page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val, 10)) : 1),
    perPage: z.string().optional().transform(val => val ? Math.max(1, parseInt(val, 10)) : 10),
});