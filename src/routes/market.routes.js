import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { 
  getMarketPrices, 
  refreshMarketData 
} from '../controllers/market.controller.js';

const router = express.Router();

router.use(authenticate);

router.get('/prices', getMarketPrices);
router.post('/refresh', refreshMarketData);

export default router;