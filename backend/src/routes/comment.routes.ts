import { Router } from 'express';
import { deleteComment } from '../controllers/comment.controllers';
import { isAuthenticated } from '../middlewares/auth.middleware';

const commentRoutes = Router();

/**
 * DELETE /api/comments/:id
 * @description Remove um comentário específico validando se quem faz a requisição é o proprietário.
 * @headers Authorization: Bearer <TOKEN>
 * @response 200 OK
 * {
 * "message": "Comentário removido com sucesso!"
 * }
 */
commentRoutes.delete('/:id', isAuthenticated, deleteComment);

export { commentRoutes };