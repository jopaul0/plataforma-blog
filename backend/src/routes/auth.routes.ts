import { Router } from 'express';
import { register, login, checkUsername, getProfile, getPublicProfile } from '../controllers/auth.controllers';
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

/**
 * GET /api/auth/users/:id
 * @description Retorna o perfil público de um autor e as suas respectivas publicações publicadas.
 * @response 200 OK
 * {
 * "id": "user-uuid-1234",
 * "name": "Nuno Silva",
 * "username": "nuno_dev",
 * "posts": [
 * {
 * "id": "post-uuid-999",
 * "title": "Arquitetura limpa com TypeScript",
 * "slug": "arquitetura-limpa-com-typescript",
 * "content": "Conteúdo do artigo...",
 * "status": "PUBLISHED",
 * "createdAt": "2026-05-30T10:00:00.000Z",
 * "updatedAt": "2026-05-30T10:00:00.000Z",
 * "deletedAt": null,
 * "authorId": "user-uuid-1234"
 * }
 * ]
 * }
 */
authRoutes.get('/users/:id', getPublicProfile);

export { authRoutes };