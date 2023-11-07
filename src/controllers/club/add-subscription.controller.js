import SubscriptionLogic from '../../business-logic/subscription';
import { returnErrorResponse } from '../../errors/error-response';
import { addValidation } from '../../validations/subscription.validations';

/**
 * Create subscription
 * @param {Express.Request} req - Express request
 * @param {Express.Response} res - Express response
 * @returns {Express.Response} 201 created subscription
 */
async function addSubscription(req, res) {
  try {
    const { body, params, userId } = req;
    await addValidation.validateAsync(body);

    const subscription = await SubscriptionLogic.create({
      ...body,
      clubId: params.clubId,
      userId,
    });

    return res.status(201).send({ subscription });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default addSubscription;
