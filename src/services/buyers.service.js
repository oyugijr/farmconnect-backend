import prisma from '../config/database.js';
import logger from '../utils/logger.js';

export const findBuyers = async (product, location) => {
  return await prisma.buyer.findMany({
    where: {
      product,
      active: true,
      location: { contains: location, mode: 'insensitive' }
    },
    orderBy: { rating: 'desc' }
  });
};

export const logBuyerContact = async (buyerPhone, farmerId) => {
  return await prisma.contact.create({
    data: {
      buyerPhone,
      farmerId,
      contactedAt: new Date()
    }
  });
};