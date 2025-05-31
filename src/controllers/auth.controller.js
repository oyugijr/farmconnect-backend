import prisma from '../config/database.js';
import ApiError from '../utils/apiError.js';
import { signToken } from '../utils/helpers.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, location, primaryProduce, phone } = req.body;
    
    // Validate product type
    const validProducts = ['tomatoes', 'maize', 'beans', 'potatoes', 'kales', 'onions', 'carrots'];
    if (!validProducts.includes(primaryProduce)) {
      throw new ApiError(400, 'Invalid product type');
    }

    // Create or update user
    const user = await prisma.user.upsert({
      where: { phone: phone || '' },
      create: { name, location, primaryProduce, phone },
      update: { name, location, primaryProduce }
    });

    // Create JWT token
    const token = signToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};