import { expect, jest } from '@jest/globals';
import ClubLogic from '../../../src/business-logic/club';
import SubscriptionModel from '../../../src/models/subscription/subscription.model';
import listByClub from '../../../src/business-logic/subscription/list-by-club';

jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/models/subscription/subscription.model');

describe('listByClub', () => {
    it('should return subscriptions for a valid club and admin user', async () => {
      const clubId = 'validClubId';
      const userId = 'adminUserId';
  
      ClubLogic.checkIfUserIsAdmin.mockResolvedValue();
  
      const subscriptions = [{ clubId: clubId }];
      SubscriptionModel.find.mockResolvedValue(subscriptions);
  
      const result = await listByClub({ clubId, userId });
  
      expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
      expect(SubscriptionModel.find).toHaveBeenCalledWith({ clubId });
      expect(result).toEqual(subscriptions);
    });
  
    it('should throw an error for a non-admin user', async () => {
      const clubId = 'validClubId';
      const userId = 'nonAdminUserId';
  
      ClubLogic.checkIfUserIsAdmin = jest.fn(() => {
        throw new Error('User is not an admin');
      });
  
      await expect(listByClub({ clubId, userId })).rejects.toThrow('User is not an admin');
    });
  });