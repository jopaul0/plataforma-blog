import { Router } from 'express';
import { getPosts, createPost, getPostByUsernameAndSlug, updatePost, getPostById, getMyPosts, deletePost, toggleLike } from '../controllers/post.controllers';
import { createComment, getComments } from '../controllers/comment.controllers';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { parseUserOptional } from '../middlewares/parseUserOptional.middleware';

const postRoutes = Router();

/**
 * GET /api/posts
 * @query ?page=1&perPage=6
 * @response 200 OK
 * {
 * "meta": { "totalItems": 12, "itemCount": 6, "itemsPerPage": 6, "totalPages": 2, "currentPage": 1 },
 * "posts": [ { "id": "...", "title": "...", "slug": "...", "content": "...", "status": "PUBLISHED", "author": { "id": "...", "name": "...", "username": "..." } } ]
 * }
 */
postRoutes.get('/', parseUserOptional, getPosts);

/**
 * GET /api/posts/me
 * @headers Authorization: Bearer TOKEN
 * @response 200 OK
 * {
 * "posts": [ { "id": "...", "title": "...", "slug": "...", "content": "...", "status": "DRAFT", "author": { "id": "...", "name": "...", "username": "..." } } ]
 * }
 */
postRoutes.get('/me', isAuthenticated, getMyPosts);

/**
 * GET /api/posts/author/:username/:slug
 * @response 200 OK
 * {
 * "id": "...", "title": "...", "slug": "...", "content": "...", "status": "PUBLISHED", "createdAt": "...", "author": { ... }
 * }
 */
postRoutes.get('/author/:username/:slug', parseUserOptional, getPostByUsernameAndSlug);

/**
 * GET /api/posts/id/:id
 * @response 200 OK
 * {
 * "id": "...", "title": "...", "slug": "...", "content": "...", "status": "DRAFT", "createdAt": "...", "author": { ... }
 * }
 */
postRoutes.get('/id/:id', getPostById);

/**
 * POST /api/posts
 * @headers Authorization: Bearer TOKEN
 * @body { title, content, status }
 * @response 201 Created
 * {
 * "message": "Post criado com sucesso!",
 * "post": { "id": "...", "title": "...", "slug": "...", "content": "...", "status": "PUBLISHED", "author": { ... } }
 * }
 */
postRoutes.post('/', isAuthenticated, createPost);

/**
 * PUT /api/posts/:id
 * @headers Authorization: Bearer TOKEN
 * @body { title, content, status }
 * @response 200 OK
 * {
 * "message": "Post updated successfully!",
 * "post": { "id": "...", "title": "...", "slug": "...", "content": "...", "status": "PUBLISHED", "author": { ... } }
 * }
 */
postRoutes.put('/:id', isAuthenticated, updatePost);

/**
 * DELETE /api/posts/:id
 * @headers Authorization: Bearer TOKEN
 * @response 200 OK
 * {
 * "message": "Artigo removido com sucesso!"
 * }
 */
postRoutes.delete('/:id', isAuthenticated, deletePost);

postRoutes.post('/:id/likes', isAuthenticated, toggleLike);

// Endpoints de Comentários vinculados a Posts (Task 12-1 e 13-1)
/**
 * POST /api/posts/:id/comments
 * @description Cria um novo comentário vinculado a um artigo específico.
 * @headers Authorization: Bearer <TOKEN>
 * @body { "content": "Excelente artigo, parabéns pelo conteúdo!" }
 * @response 201 Created
 * {
 * "message": "Comentário enviado!",
 * "comment": {
 * "id": "comment-uuid-555",
 * "content": "Excelente artigo, parabéns pelo conteúdo!",
 * "createdAt": "2026-05-30T13:05:00.000Z",
 * "updatedAt": "2026-05-30T13:05:00.000Z",
 * "deletedAt": null,
 * "authorId": "user-uuid-987",
 * "postId": "post-uuid-111",
 * "author": {
 * "id": "user-uuid-987",
 * "name": "Mariana Costa",
 * "username": "mari_costa"
 * }
 * }
 * }
 */
postRoutes.post('/:id/comments', isAuthenticated, createComment);

/**
 * GET /api/posts/:id/comments
 * @description Retorna a lista completa de comentários ativos de uma postagem específica.
 * @response 200 OK
 * {
 * "comments": [
 * {
 * "id": "comment-uuid-555",
 * "content": "Excelente artigo, parabéns pelo conteúdo!",
 * "createdAt": "2026-05-30T13:05:00.000Z",
 * "updatedAt": "2026-05-30T13:05:00.000Z",
 * "deletedAt": null,
 * "authorId": "user-uuid-987",
 * "postId": "post-uuid-111",
 * "author": {
 * "id": "user-uuid-987",
 * "name": "Mariana Costa",
 * "username": "mari_costa"
 * }
 * }
 * ]
 * }
 */
postRoutes.get('/:id/comments', getComments);

export { postRoutes };