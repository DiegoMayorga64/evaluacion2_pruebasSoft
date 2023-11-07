import HTTPError from '../../errors/http.error';
import memberErrors from '../../errors/member.errors';
import MemberModel from '../../models/member/member.model';
import ClubLogic from '../club';
import checkClubExists from '../../utils/check-club-exists.util';

/**
 * Create member
 * @param {object} args - Required arguments
 * @param {string} args.name - Member's name
 * @param {string} args.email - Member's email
 * @param {string} [args.dni] - Member's DNI
 * @param {string} [args.nickname] - Member's nickname
 * @param {string} args.clubId - Club id associated to the member
 * @param {string} args.userId - req.userId (from token) must be the club admin
 * @returns {Member} Created member
 */
async function create(args) {
  const { clubId, userId } = args;

  await checkClubExists({
    clubId,
    errorObject: new HTTPError({ ...memberErrors.clubNotFound, code: 404 }),
  });
  await ClubLogic.checkIfUserIsAdmin({ clubId, userId });

  const member = await MemberModel.create(args);
  return member;
}

export default create;
