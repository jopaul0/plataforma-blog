import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';

export const app = express()
app.use(cors({
  origin: process.env.URL_FRONTEND || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

// routes
app.get('/health', (_req, res) => {
  res.json({ status: 'O servidor está rodando!' })
})

import { authRoutes } from './routes/auth.routes';
import { postRoutes } from './routes/post.routes';

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);