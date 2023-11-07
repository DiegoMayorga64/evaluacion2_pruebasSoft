import { JsonWebTokenError } from 'jsonwebtoken';
import log from '../configs/log';
import HTTPError from './http.error';

/**
 * Error reusable response
 * @param {Error} error - Error instance
 * @param {Express.Response} res - Express response
 * @returns {Express.Response} express response with status code and error json
 */
function returnErrorResponse({ error, res }) {
  log.error(error.toString());

  if (error instanceof HTTPError) {
    const { statusCode } = error;
    return res.status(statusCode).send({ error });
  }

  if (error instanceof JsonWebTokenError) {
    const jwtError = new HTTPError({
      name: error.name,
      message: error.message,
      code: 403,
    });
    return res.status(403).json({ error: jwtError });
  }
  return res.status(500).send({ error: error.toString() });
}

export { returnErrorResponse };
