import { returnErrorResponse } from '../errors/error-response';
import HTTPError from '../errors/http.error';
import { verifyToken } from '../utils/jwt.util';

/**
 * Auth middleware checks if token exists and is a valid JWT (formed and not expired)
 * @param {Express.Request} req - Request express object
 * @param {Express.Response} res - Response express object
 * @param {Express.NextFunction} next - Next function express
 * @returns Next or errorResponse (token not valid or not exists)
 */
function authMiddleware(req, res, next) {
  const headers = req.headers;

  const authorization = headers['Authorization'] ?? headers['authorization'];

  if (!authorization) {
    return returnErrorResponse({
      error: new HTTPError({
        name: 'auhtorization_token_is_required',
        message: 'the authorization header is needed and the token',
        code: 401,
      }),
      res,
    });
  }

  try {
    const token = authorization.split(' ')[1];

    const payload = verifyToken(token);
    req.userId = payload.userId;

    next();
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default authMiddleware;
