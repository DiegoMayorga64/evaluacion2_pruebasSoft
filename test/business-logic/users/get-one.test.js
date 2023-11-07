import { expect, jest } from '@jest/globals';
import UserModel from '../../../src/models/user/user.model';
import getOne from '../../../src/business-logic/users/get-one';

jest.mock('../../../src/models/user/user.model')

describe('getOne function', () => {
    it('should return a user when called with valid parameters', async () => {
      const query = { _id: 'someUserId' };
      const select = ['name', 'email'];
      const populate = ['friends'];

      UserModel.findOne.mockReturnValue(Promise.resolve({ name: 'John', email: 'john@example.com' }));
  
      const user = await getOne({ query, select, populate });
  
      expect(user).toEqual({ name: 'John', email: 'john@example.com' });
    });
  
    it('should return null when no user is found', async () => {
      const query = { _id: 'nonExistentUserId' };
      const select = ['name', 'email'];
      const populate = ['friends'];

      UserModel.findOne.mockReturnValue(Promise.resolve(null));
  
      const user = await getOne({ query, select, populate });
  
      expect(user).toBeNull();
    });
  });