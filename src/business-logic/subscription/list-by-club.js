import SubscriptionModel from '../../models/subscription/subscription.model';
import ClubLogic from '../club';

/**
 * List all subscriptions by club
 * @param {string} clubId - Club id
 * @param {string} userId - req.userId (from token) must be the club admin
 * @returns {Subscription[]} List of subscriptions
 */
async function listByClub({ clubId, userId }) {
  await ClubLogic.checkIfUserIsAdmin({ clubId, userId });

  const subscriptions = await SubscriptionModel.find({ clubId });
  return subscriptions;
}

export default listByClub;
