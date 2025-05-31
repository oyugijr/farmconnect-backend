import app from './app.js';
import prisma from './config/database.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 4000;

prisma.$connect()
  .then(() => {
    logger.info('Database connected');
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to database:', error);
    process.exit(1);
  });