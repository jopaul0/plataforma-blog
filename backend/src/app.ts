import express from 'express';
import 'dotenv/config';
import { errorHandler } from './middlewares/errorHandler';

export const app = express()
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'O servidor está rodando!' })
})

// routes

app.use(errorHandler);