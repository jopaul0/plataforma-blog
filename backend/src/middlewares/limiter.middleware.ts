import { rateLimit } from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: 'Muitas tentativas. Tente novamente após 15 minutos.',
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});