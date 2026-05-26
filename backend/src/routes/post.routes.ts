import { Router } from 'express';
import { getPosts, createPost, getPostByUsernameAndSlug, updatePost, getPostById, getMyPosts } from '../controllers/post.controllers';
import { isAuthenticated } from '../middlewares/auth.middleware';

const postRoutes = Router();

postRoutes.get('/', getPosts);
postRoutes.get('/author/:username/:slug', getPostByUsernameAndSlug);
postRoutes.get('/id/:id', getPostById);
postRoutes.get('/me', isAuthenticated, getMyPosts);

postRoutes.post('/', isAuthenticated, createPost);

postRoutes.put('/:id', isAuthenticated, updatePost);

export { postRoutes };