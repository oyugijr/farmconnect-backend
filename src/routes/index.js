import express from 'express';
import authRouter from './auth.routes.js';
import marketRouter from './market.routes.js';
import buyersRouter from './buyers.routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/market', marketRouter);
router.use('/buyers', buyersRouter);

export default router;