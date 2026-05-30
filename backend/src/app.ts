import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import { authRoutes } from './routes/auth.routes';
import { postRoutes } from './routes/post.routes';
import { commentRoutes } from './routes/comment.routes'; // Nova rota importada

export const app = express();

app.use(cors({
  origin: process.env.URL_FRONTEND || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'O servidor está rodando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use(errorHandler);