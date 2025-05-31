import Joi from 'joi';

export const buyerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  product: Joi.string().valid(
    'tomatoes', 'maize', 'beans', 
    'potatoes', 'kales', 'onions', 'carrots'
  ).required(),
  quantity: Joi.string().required(),
  rating: Joi.number().min(0).max(5)
});