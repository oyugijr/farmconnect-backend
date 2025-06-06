import prisma from '../config/database.js';
import ApiError from '../utils/apiError.js';

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body
    });
    
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};