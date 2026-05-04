import { Router } from 'express';
import { register } from '../controllers/auth.controllers';
import { authLimiter } from '../middlewares/limiter.middleware';

const authRoutes = Router();

authRoutes.post('/register', authLimiter, register);

export { authRoutes };