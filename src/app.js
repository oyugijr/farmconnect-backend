import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import logger from './utils/logger.js';
import router from './routes/index.js';
import errorHandler from './middlewares/error.js';
import { initializeWebSocket } from './services/alert.service.js';

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api', router);

// Error handling
app.use(errorHandler);

// WebSocket Server
const server = app.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`);
});

initializeWebSocket(server);