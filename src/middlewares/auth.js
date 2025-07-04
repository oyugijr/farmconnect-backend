import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import prisma from '../config/database.js';

export const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, ERROR_MESSAGES.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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