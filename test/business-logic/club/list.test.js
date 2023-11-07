import { expect, jest } from '@jest/globals';
import ClubModel from '../../../src/models/club/club.model';
import list from '../../../src/business-logic/club/list';

jest.mock('../../../src/business-logic/club');

afterEach(async ()=>{
    jest.resetAllMocks();
    await ClubModel.deleteMany({});
});

describe('list()', () => {
    it('should list all clubs with admin and manager.userId populated', async () => {
      
      const mockFind = jest.spyOn(ClubModel, 'find');
      mockFind.mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue([
          { admin: { userId: 'adminUserId' }, managers: [{ userId: 'managerUserId' }] },
        ]),
      });
  
      const result = await list();
  
      expect(result).toEqual([
        {
          admin: { userId: 'adminUserId' },
          managers: [{ userId: 'managerUserId' }],
        },
      ]);
      mockFind.mockRestore();
    });
  });