import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import prisma from './config/database.js';
import router from './routes/index.js';
import errorHandler from './middlewares/error.js';
import { initializeWebSocket } from './services/alert.service.js';
import { neonPool } from './middlewares/neonPool.js';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';

const app = express();

// Redis client for rate limiting
const redisClient = createClient({
  url: process.env.REDIS_URL
});
redisClient.connect().catch(console.error);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args)
  })
});

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(neonPool);
app.use(limiter);

// Routes
app.use('/api', router);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling
app.use(errorHandler);

// WebSocket Server
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
  initializeWebSocket(server);
});

export default app;