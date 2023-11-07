import { expect, jest } from '@jest/globals';
import ClubModel from '../../../src/models/club/club.model';
import ClubLogic from '../../../src/business-logic/club';
import get from '../../../src/business-logic/club/get';

jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/business-logic/users');

afterEach(async ()=>{
    jest.resetAllMocks();
    await ClubModel.deleteMany({});
});

describe('get', () => {
    it('should return a club when it exists', async () => {
      const clubId = '123';
  
      const club = { _id: 'clubId', name: 'Club Name' };
  
      ClubLogic.get.mockResolvedValue(club);

      const result = await get(clubId);
 
      expect(result).toEqual(club);
    });
  
    it('should throw a 404 error when the club does not exist', async () => {
      const clubId = '456';
  
      ClubLogic.get.mockResolvedValue(null);
  
      await expect(get(clubId)).rejects.toThrow('404 error');
    });
  });

