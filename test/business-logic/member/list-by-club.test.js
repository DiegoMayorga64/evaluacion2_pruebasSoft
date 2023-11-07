import { expect, jest } from '@jest/globals';
import MemberModel from '../../../src/models/member/member.model';
import ClubLogic from '../../../src/business-logic/club';
import listByClub from '../../../src/business-logic/member/list-by-club';

jest.mock('../../../src/business-logic/club');

describe('listByClub', () => {
    it('should return a list of members for a given club', async () => {
      ClubLogic.checkIfUserIsAdmin.mockImplementation(() => Promise.resolve());
  
      const clubId = 'testClubId';
      const userId = 'testUserId';

      let memberData1;
      let memberData2;

      MemberModel.find = jest.fn().mockResolvedValue([{ memberData1, memberData2 }]);
  
      const result = await listByClub({ clubId, userId });
  
      expect(result).toEqual([{ memberData1, memberData2 }]);
      expect(MemberModel.find).toHaveBeenCalledWith({ clubId });
      expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
    });
  
    it('should throw an error if user is not the club admin', async () => {
      ClubLogic.checkIfUserIsAdmin.mockImplementation(() => Promise.reject(new Error('User is not the club admin')));
  
      const clubId = 'testClubId';
      const userId = 'testUserId';
  
      await expect(listByClub({ clubId, userId })).rejects.toThrow('User is not the club admin');
    });
  });