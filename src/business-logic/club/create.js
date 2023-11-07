import ClubModel from '../../models/club/club.model';
import UserLogic from '../users';

/**
 * Create club
 * @param {object} args - Required arguments
 * @param {string} args.name - Club name
 * @param {string} args.adminId - Club's admin
 * @param {string} [args.description] - Club description
 * @returns {Club} Created club
 */
async function create(args) {
  const { name, description, adminId } = args;

  const { _id: userId } = await UserLogic.getOne({
    query: { _id: adminId },
    select: ['_id'],
  });

  const club = await ClubModel.create({ name, description, admin: userId });
  return club;
}

export default create;
