import Joi from 'joi';
import { requiredEmail, requiredString } from './schema-common-types';
import envs from '../configs/environment';
import HTTPError from '../errors/http.error';
import authErrors from '../errors/auth.errors';

const { validationStatusCode } = envs;
const validationErrorName = authErrors.login.validation.name;

const loginValidation = Joi.object()
  .required()
  .keys({
    email: requiredEmail(
      new HTTPError({
        name: validationErrorName,
        message: authErrors.login.validation.messages.email,
        code: validationStatusCode,
      }),
    ),
    password: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: authErrors.login.validation.messages.password,
        code: validationStatusCode,
      }),
    ),
  });

// eslint-disable-next-line import/prefer-default-export
export { loginValidation };
