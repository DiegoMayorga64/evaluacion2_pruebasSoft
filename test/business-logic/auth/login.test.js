import { expect, jest } from '@jest/globals';
import login from '../../../src/business-logic/auth/login';
import UserLogic from '../../../src/business-logic/users';
import { generateToken } from '../../../src/utils/jwt.util';
import authErrors from '../../../src/errors/auth.errors';

jest.mock('../../../src/business-logic/users');
jest.mock('../../../src/utils/jwt.util');

describe('Logic: Auth: Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return a valid token', async () => {
    UserLogic.getOne.mockReturnValue({
      name: 'juan',
      _id: 1,
      email: 'email',
      comparePassword: () => true,
    });

    generateToken.mockReturnValue('valid-token');

    const result = await login({ email: 'email@gmail.com', password: '123asd' });

    expect(result).toEqual('valid-token');
    expect(generateToken).toBeCalledWith({
      data: { userId: 1, name: 'juan' },
      expiresIn: '1d',
    });
    expect(UserLogic.getOne).toBeCalled();
  });

  it('Should throw an error when userLogic.getOne throws', async () => {
    UserLogic.getOne.mockRejectedValue(new Error('user-logic-error'));
    try {
      await login({ email: 'email@gmail.com', password: '123asd' });
      throw new Error('other-error');
    } catch (error) {
      expect(error.message).toEqual('user-logic-error');
      expect(generateToken).not.toBeCalled();
      expect(UserLogic.getOne).toBeCalled();
    }
  });

  it('Should throw an error invalid credentials when comparePassword return false', async () => {
    UserLogic.getOne.mockReturnValue({
      name: 'juan',
      _id: 1,
      email: 'email',
      comparePassword: () => false,
    });
    try {
      await login({ email: 'email@gmail.com', password: '123asd' });
      throw new Error('other-error');
    } catch (error) {
      expect(error.message).toEqual(authErrors.login.invalidCredentials.message);
      expect(error.name).toEqual(authErrors.login.invalidCredentials.name);
      expect(error.statusCode).toEqual(400);
      expect(generateToken).not.toBeCalled();
      expect(UserLogic.getOne).toBeCalled();
    }
  });
});
