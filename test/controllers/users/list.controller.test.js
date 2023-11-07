import { expect, jest } from '@jest/globals';
import UsersLogic from '../../../src/business-logic/users';
import listController from '../../../src/controllers/user/list.controller';
import HTTPError from '../../../src/errors/http.error';

jest.mock('../../../src/business-logic/users', () => ({
  list: jest.fn().mockReturnThis(),
}));

let resMock;

describe('Controller: User: List users', () => {
  beforeEach(() => {
    resMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return a empty list', async () => {
    UsersLogic.list.mockReturnValue([]);

    await listController({}, resMock);

    expect(resMock.status).toBeCalledWith(200);
    expect(resMock.send).toBeCalledWith({ users: [] });
    expect(UsersLogic.list).toHaveBeenCalled();
  });

  it('Should return a list of users', async () => {
    const users = [{ name: 'user1', email: 'email@gmail.com' }];
    UsersLogic.list.mockReturnValue(users);

    await listController({}, resMock);

    expect(resMock.status).toBeCalledWith(200);
    expect(resMock.send).toBeCalledWith({ users });
    expect(UsersLogic.list).toHaveBeenCalled();
  });

  it('Should throw an error when the logic fails', async () => {
    const error = new HTTPError({ name: 'error', message: 'some-error', code: 400 });

    UsersLogic.list.mockRejectedValue(error);

    await listController({}, resMock);

    expect(resMock.status).toBeCalledWith(400);
    expect(resMock.send).toBeCalledWith({ error });
    expect(UsersLogic.list).toHaveBeenCalled();
  });
});
