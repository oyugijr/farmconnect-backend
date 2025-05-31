import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
  primaryProduce: Joi.string().valid(
    'tomatoes', 'maize', 'beans',
    'potatoes', 'kales', 'onions', 'carrots'
  ).required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
  targetPrice: Joi.number().min(0)
});