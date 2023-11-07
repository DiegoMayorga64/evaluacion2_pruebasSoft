import { expect, jest } from '@jest/globals';
import HTTPError from '../../../src/errors/http.error';
import subscriptionErrors from '../../../src/errors/subscription.errors';
import ClubLogic from '../../../src/business-logic/club';
import SubscriptionModel from '../../../src/models/subscription/subscription.model';
import create from '../../../src/business-logic/subscription/create';

jest.mock('../../../src/utils/check-club-exists.util')
jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/errors/subscription.errors');

afterEach(async ()=>{
    jest.resetAllMocks();
});

describe('create', () => {
    it('should create a subscription successfully', async () => {
      const args = {
        name: 'Test Subscription',
        price: '10.00',
        description: 'Test Description',
        clubId: 'club123',
        userId: 'user123',
      };
  
      SubscriptionModel.create.mockResolvedValue({ ...args, _id: 'subscription123' });
  
      await expect(create(args)).resolves.toEqual({ ...args, _id: 'subscription123' });
  
      expect(SubscriptionModel.create).toHaveBeenCalledWith(args);
    });
  
    it('should handle club not found error', async () => {
      const args = {
        name: 'Test Subscription',
        price: '10.00',
        description: 'Test Description',
        clubId: 'club123',
        userId: 'user123',
      };
  
      const error = new HTTPError({ ...subscriptionErrors.clubNotFound, code: 404 });
  
      jest.spyOn(require('../../../src/utils/check-club-exists.util'), 'default').mockRejectedValue(error);
  
      await expect(create(args)).rejects.toThrow(error);
  
      expect(SubscriptionModel.create).not.toHaveBeenCalled();
    });
  
    it('should handle user not admin error', async () => {
      const args = {
        name: 'Test Subscription',
        price: '10.00',
        description: 'Test Description',
        clubId: 'club123',
        userId: 'user123',
      };
  
      const error = new Error('User is not an admin.');
  
      ClubLogic.checkIfUserIsAdmin.mockRejectedValue(error);
  
      await expect(create(args)).rejects.toThrow(error);
  
      expect(SubscriptionModel.create).not.toHaveBeenCalled();
    });
  });