import Joi from 'joi';
import ApiError from '../utils/apiError.js';

export const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    primaryProduce: Joi.string().valid(...PRODUCT_TYPES).required(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/)
  });

  validateRequest(req, next, schema);
};

export const validateMarketData = (req, res, next) => {
  const schema = Joi.object({
    product: Joi.string().valid(...PRODUCT_TYPES).required(),
    price: Joi.number().min(0).required(),
    market: Joi.string().required()
  });

  validateRequest(req, next, schema);
};

function validateRequest(req, next, schema) {
  const { error } = schema.validate(req.body);
  if (error) next(new ApiError(400, error.details[0].message));
  next();
}