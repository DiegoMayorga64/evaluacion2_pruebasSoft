import { returnErrorResponse } from '../errors/error-response';
import HTTPError from '../errors/http.error';
import UserModel from '../models/user/user.model';

/**
 * Is admin middleware checks if the current logged user (req.userId) has the isAdmin field set to true
 * @param {Express.Request} req - Request express object
 * @param {Express.Response} res - Response express object
 * @param {Express.NextFunction} next - Next function express
 * @returns Next or errorResponse (isAdmin = false or not exists)
 */
async function isAdminMiddleware(req, res, next) {
  try {
    const user = await UserModel.findById(req.userId).select('isAdmin');

    if (!user || !user.isAdmin) {
      return returnErrorResponse({
        error: new HTTPError({
          name: 'forbidden_not_admin',
          message: 'the users is not admin',
          code: 403,
        }),
        res,
      });
    }
    next();
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default isAdminMiddleware;
