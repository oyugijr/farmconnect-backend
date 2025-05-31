import ApiError from '../utils/apiError.js';
import { verifyToken } from '../utils/helpers.js';
import prisma from '../config/database.js';

export const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Please log in to access this resource');
    }

    const decoded = verifyToken(token);
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.sub }
    });

    if (!currentUser) {
      throw new ApiError(401, 'User no longer exists');
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};