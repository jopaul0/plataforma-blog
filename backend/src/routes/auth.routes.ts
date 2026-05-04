import { Router } from 'express';
import { register, login } from '../controllers/auth.controllers';
import { authLimiter } from '../middlewares/limiter.middleware';

const authRoutes = Router();

authRoutes.post('/register', authLimiter, register);
authRoutes.post('/login', authLimiter, login);

export { authRoutes };