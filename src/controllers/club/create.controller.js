import ClubLogic from '../../business-logic/club';
import { returnErrorResponse } from '../../errors/error-response';
import { createValidation } from '../../validations/club.validations';

/**
 * Create club
 * @param {Express.Request} req - Express request
 * @param {Express.Response} res - Express response
 * @returns {Express.Response} 201 created club
 */
async function create(req, res) {
  try {
    const { body } = req;
    await createValidation.validateAsync(body);

    const club = await ClubLogic.create(body);

    return res.status(201).send({ club });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default create;
