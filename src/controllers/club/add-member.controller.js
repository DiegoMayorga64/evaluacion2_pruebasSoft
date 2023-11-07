import MemberLogic from '../../business-logic/member';
import { returnErrorResponse } from '../../errors/error-response';
import { addValidation } from '../../validations/member.validations';

/**
 * Add a member to a specific club
 * @param {Express.Request} req - Express request
 * @param {Express.Response} res - Express response
 * @returns {Express.Response} 201 created member
 */
async function addMember(req, res) {
  try {
    const { body, params, userId } = req;
    await addValidation.validateAsync(body);

    const member = await MemberLogic.create({ ...body, clubId: params.clubId, userId });

    return res.status(201).send({ member });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default addMember;
