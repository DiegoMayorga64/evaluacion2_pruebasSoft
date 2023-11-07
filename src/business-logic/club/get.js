import ClubModel from '../../models/club/club.model';

/**
 * Get Club
 * @param {string} clubId - Club id to find
 * @throws {HTTPError} 404 error if the club doesnt exists
 */
export default async function get(clubId) {
  const club = await ClubModel.findById(clubId);
  return club;
}
