import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { 
  getVerifiedBuyers,
  logBuyerContact
} from '../controllers/buyers.controller.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getVerifiedBuyers);
router.post('/contact', logBuyerContact);

export default router;