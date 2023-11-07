import Joi from 'joi';

const requiredString = (error) => Joi.string().required().error(error);
const requiredNumber = (error) => Joi.number().required().error(error);
const optionalNumber = (error) => Joi.number().optional().error(error);
const optionalString = (error) => Joi.string().allow('').optional().error(error);
const requiredEmail = (error) => Joi.string().email().required().error(error);

export { requiredString, requiredNumber, optionalNumber, optionalString, requiredEmail };
