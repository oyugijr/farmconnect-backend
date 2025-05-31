import Joi from 'joi';

export const marketPriceSchema = Joi.object({
  product: Joi.string().required(),
  price: Joi.number().min(0).required(),
  market: Joi.string().required(),
  trend: Joi.string().valid('rising', 'falling', 'stable')
});