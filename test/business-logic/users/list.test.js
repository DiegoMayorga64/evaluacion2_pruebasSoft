import { expect, jest } from '@jest/globals';
import UserModel from '../../../src/models/user/user.model';
import list from '../../../src/business-logic/users/list';
import userFactory from '../../factories/user.factory.v2';

jest.mock('../../../src/models/user/user.model');

describe('Business logic: List users', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return a empty list', async () => {
    UserModel.find.mockReturnValue([]);

    const result = await list();

    expect(UserModel.find).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('Should return a list of users', async () => {
    const usersLength = 5;
    const users = userFactory.buildList(usersLength, { isAdmin: true });
    UserModel.find.mockReturnValue(users);

    const result = await list();

    expect(UserModel.find).toHaveBeenCalled();
    expect(result).toEqual(users);
    expect(result).toHaveLength(usersLength);
    expect(result[0]).toHaveProperty('_id');

    result.forEach((user, i) => {
      expect(user.name).toEqual(`name ${i + 1}`);
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('isAdmin');
    });
  });
});
