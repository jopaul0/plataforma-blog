import { Router } from 'express';
import { getPosts, createPost, getPostByUsernameAndSlug, updatePost, getPostById, getMyPosts, deletePost } from '../controllers/post.controllers';
import { isAuthenticated } from '../middlewares/auth.middleware';

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
postRoutes.get('/', getPosts);

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
postRoutes.get('/author/:username/:slug', getPostByUsernameAndSlug);

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

export { postRoutes };