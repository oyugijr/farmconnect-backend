import express from 'express';
import { getVerifiedBuyers } from '../controllers/buyers.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, getVerifiedBuyers);

export default router;