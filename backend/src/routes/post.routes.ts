import { Router } from 'express';
import { getPosts, createPost, getPostByUsernameAndSlug, updatePost } from '../controllers/post.controllers';
import { isAuthenticated } from '../middlewares/auth.middleware';

const postRoutes = Router();

postRoutes.get('/', getPosts);
postRoutes.get('/:username/:slug', getPostByUsernameAndSlug);

postRoutes.post('/', isAuthenticated, createPost);

postRoutes.put('/:id', isAuthenticated, updatePost);

export { postRoutes };