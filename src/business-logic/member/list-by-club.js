import MemberModel from '../../models/member/member.model';
import ClubLogic from '../club';

/**
 * List all members on specific club
 * @param {string} clubId - Club id
 * @param {string} userId - req.userId (from token) must be the club admin
 * @returns {Member[]} List of members
 */
async function listByClub({ clubId, userId }) {
  await ClubLogic.checkIfUserIsAdmin({ clubId, userId });

  const members = await MemberModel.find({ clubId });
  return members;
}

export default listByClub;
