import ClubLogic from '../business-logic/club';

/**
 * Check if the club exists in Club collection
 * @param {string} args.clubId - Candidate club id
 * @param {HTTPError} args.errorObject - Error object
 * @throws {HTTPError} 404 error if the club doesnt exists
 */
export default async function checkClubExists({ clubId, errorObject }) {
  const club = await ClubLogic.get(clubId);

  if (!club) {
    throw errorObject;
  }
}
