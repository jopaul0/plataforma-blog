import express from 'express';
import 'dotenv/config';
import { errorHandler } from './middlewares/error.middleware';

export const app = express()
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'O servidor está rodando!' })
})

// routes
import { authRoutes } from './routes/auth.routes';
app.use('/api/auth', authRoutes);

app.use(errorHandler);