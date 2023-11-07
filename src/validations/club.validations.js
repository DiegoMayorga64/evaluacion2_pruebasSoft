import Joi from 'joi';
import clubErrors from '../errors/club.errors';
import { optionalString, requiredString } from './schema-common-types';
import envs from '../configs/environment';
import HTTPError from '../errors/http.error';

const { validationStatusCode } = envs;
const validationErrorName = clubErrors.validation.name;

const createValidation = Joi.object()
  .required()
  .keys({
    name: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: clubErrors.validation.messages.name,
        code: validationStatusCode,
      }),
    ),
    description: optionalString(
      new HTTPError({
        name: validationErrorName,
        message: clubErrors.validation.messages.description,
        code: validationStatusCode,
      }),
    ),
    adminId: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: clubErrors.validation.messages.adminId,
        code: validationStatusCode,
      }),
    ),
  });

export { createValidation };
