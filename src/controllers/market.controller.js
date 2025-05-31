import prisma from '../config/database.js';
import ApiError from '../utils/apiError.js';
import { analyzeMarketTrends } from '../services/market.service.js';

export const getMarketPrices = async (req, res, next) => {
  try {
    const { product } = req.query;
    const { location } = req.user;
    
    const prices = await prisma.marketPrice.findMany({
      where: { product },
      orderBy: { recordedAt: 'desc' },
      take: 7
    });

    if (!prices.length) {
      throw new ApiError(404, 'No market data available for this product');
    }

    const processedData = await analyzeMarketTrends(prices, location);

    res.status(200).json({
      status: 'success',
      data: processedData
    });
  } catch (error) {
    next(error);
  }
};

export const refreshMarketData = async (req, res, next) => {
  try {
    const { product } = req.body;
    const newPrice = await generateNewPriceData(product);
    
    res.status(200).json({
      status: 'success',
      data: newPrice
    });
  } catch (error) {
    next(error);
  }
};