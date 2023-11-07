import Joi from 'joi';
import memberErrors from '../errors/member.errors';
import { optionalString, requiredEmail, requiredString } from './schema-common-types';
import envs from '../configs/environment';
import HTTPError from '../errors/http.error';

const { validationStatusCode } = envs;
const validationErrorName = memberErrors.validation.name;

const addValidation = Joi.object()
  .required()
  .keys({
    name: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: memberErrors.validation.messages.name,
        code: validationStatusCode,
      }),
    ),
    lastName: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: memberErrors.validation.messages.lastName,
        code: validationStatusCode,
      }),
    ),
    email: requiredEmail(
      new HTTPError({
        name: validationErrorName,
        message: memberErrors.validation.messages.email,
        code: validationStatusCode,
      }),
    ),
    dni: optionalString(
      new HTTPError({
        name: validationErrorName,
        message: memberErrors.validation.messages.dni,
        code: validationStatusCode,
      }),
    ),
    nickname: optionalString(
      new HTTPError({
        name: validationErrorName,
        message: memberErrors.validation.messages.nickname,
        code: validationStatusCode,
      }),
    ),
  });

// eslint-disable-next-line import/prefer-default-export
export { addValidation };
