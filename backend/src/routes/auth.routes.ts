import { Router } from 'express';
import { register, login, checkUsername, getProfile } from '../controllers/auth.controllers';
import { authLimiter } from '../middlewares/limiter.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';

const authRoutes = Router();

/**
 * POST /api/auth/register
 * @body { name, username, email, password }
 * @response 210 Created
 * {
 * "message": "Usuário criado com sucesso",
 * "user": { "id": "uuid", "name": "...", "username": "...", "email": "...", "createdAt": "..." }
 * }
 */
authRoutes.post('/register', authLimiter, register);

/**
 * POST /api/auth/login
 * @body { email, password }
 * @response 200 OK
 * {
 * "user": { "id": "uuid", "name": "...", "username": "...", "email": "..." },
 * "token": "JWT_STRING"
 * }
 */
authRoutes.post('/login', authLimiter, login);

/**
 * GET /api/auth/check-username
 * @query ?username=joao_dev
 * @response 200 OK
 * {
 * "available": true
 * }
 */
authRoutes.get('/check-username', checkUsername);

/**
 * GET /api/auth/me
 * @headers Authorization: Bearer TOKEN
 * @response 200 OK
 * {
 * "user": { "id": "uuid", "name": "...", "username": "...", "email": "...", "createdAt": "..." }
 * }
 */
authRoutes.get('/me', isAuthenticated, getProfile);

export { authRoutes };