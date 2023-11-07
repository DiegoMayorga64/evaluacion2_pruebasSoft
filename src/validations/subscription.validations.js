import Joi from 'joi';
import subscriptionErrors from '../errors/subscription.errors';
import { optionalString, requiredNumber, requiredString } from './schema-common-types';
import envs from '../configs/environment';
import HTTPError from '../errors/http.error';

const { validationStatusCode } = envs;
const validationErrorName = subscriptionErrors.validation.name;

const addValidation = Joi.object()
  .required()
  .keys({
    name: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: subscriptionErrors.validation.messages.name,
        code: validationStatusCode,
      }),
    ),
    price: requiredNumber(
      new HTTPError({
        name: validationErrorName,
        message: subscriptionErrors.validation.messages.price,
        code: validationStatusCode,
      }),
    ),
    description: optionalString(
      new HTTPError({
        name: validationErrorName,
        message: subscriptionErrors.validation.messages.description,
        code: validationStatusCode,
      }),
    ),
  });

// eslint-disable-next-line import/prefer-default-export
export { addValidation };
