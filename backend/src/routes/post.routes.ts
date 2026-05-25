import { Router } from 'express';
import { getPosts } from '../controllers/post.controllers';

const postRoutes = Router();

postRoutes.get('/', getPosts);

export { postRoutes };