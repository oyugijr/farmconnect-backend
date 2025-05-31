import prisma from '../config/database.js';
import ApiError from '../utils/apiError.js';

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body
    });
    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(400, 'Failed to update profile'));
  }
};

export const updatePriceAlert = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { targetPrice: req.body.targetPrice }
    });
    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(400, 'Failed to update alert settings'));
  }
};