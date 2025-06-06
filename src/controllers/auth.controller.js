import prisma from '../config/database.js';
import ApiError from '../utils/apiError.js';
import { signToken } from '../utils/helpers.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, location, primaryProduce, phone } = req.body;
    
    const validProducts = ['tomatoes', 'maize', 'beans', 'potatoes', 'kales', 'onions', 'carrots'];
    if (!validProducts.includes(primaryProduce)) {
      throw new ApiError(400, 'Invalid product type');
    }

    const user = await prisma.user.upsert({
      where: { phone: phone || '' },
      create: { name, location, primaryProduce, phone },
      update: { name, location, primaryProduce }
    });

    const token = signToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
      user
    });
  } catch (error) {
    next(error);
  }
}; 