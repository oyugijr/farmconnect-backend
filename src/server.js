import app from './app.js';
import prisma from './config/database.js';

const PORT = process.env.PORT || 4000;

prisma.$connect()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });