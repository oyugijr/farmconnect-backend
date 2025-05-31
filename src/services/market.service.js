import prisma from '../config/database.js';

export const analyzeMarketTrends = async (prices, location) => {
  const currentPrice = prices[0].price;
  const previousPrice = prices[1]?.price || currentPrice;
  const change = currentPrice - previousPrice;
  
  const trend = calculateTrend(prices);
  
  return {
    currentPrice,
    change: parseFloat(change.toFixed(2)),
    trend,
    market: getMainMarket(location),
    lastUpdated: new Date().toISOString()
  };
};

function calculateTrend(prices) {
  const recentPrices = prices.slice(0, 3).map(p => p.price);
  if (recentPrices.every((v, i, a) => v > a[i + 1])) return 'rising';
  if (recentPrices.every((v, i, a) => v < a[i + 1])) return 'falling';
  return 'stable';
}

function getMainMarket(location) {
  const markets = {
    nairobi: 'Gikomba Market',
    nakuru: 'Nakuru Main Market',
    kiambu: 'Kiambu Farmers Market'
  };
  return markets[location.toLowerCase()] || 'Regional Market';
}