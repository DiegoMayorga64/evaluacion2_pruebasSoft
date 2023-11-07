import AuthLogic from '../../business-logic/auth';
import { returnErrorResponse } from '../../errors/error-response';
import { loginValidation } from '../../validations/auth.validations';

/**
 * User Login controller
 * @param {Express.Request} req - Express request
 * @param {Express.Response} res - Express response
 * @returns {Express.Response} 200 token
 */
async function login(req, res) {
  try {
    const { body } = req;

    await loginValidation.validateAsync(body);

    const token = await AuthLogic.login(body);

    return res.status(200).send({ token });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default login;
