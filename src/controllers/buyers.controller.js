import prisma from '../config/database.js';
import ApiError from '../utils/apiError.js';

export const getVerifiedBuyers = async (req, res, next) => {
  try {
    const { product, location } = req.query;
    
    const buyers = await prisma.buyer.findMany({
      where: {
        product,
        active: true,
        location: { contains: location, mode: 'insensitive' }
      },
      orderBy: { rating: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      results: buyers.length,
      data: buyers
    });
  } catch (error) {
    next(error);
  }
};