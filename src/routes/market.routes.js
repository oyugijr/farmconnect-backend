const express = require('express');
const router = express.Router();
const { getMarketPrices, refreshMarketData } = require('../controllers/market.controller');
const authMiddleware = require('../middlewares/auth');

router.get('/prices', authMiddleware, getMarketPrices);
router.post('/refresh', authMiddleware, refreshMarketData);

module.exports = router;