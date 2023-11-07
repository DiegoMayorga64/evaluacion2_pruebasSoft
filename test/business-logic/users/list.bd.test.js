import { expect, jest } from '@jest/globals';
import UserModel from '../../../src/models/user/user.model';
import list from '../../../src/business-logic/users/list';

describe('Business logic: List users with database', () => {
  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it('Should return a empty list', async () => {
    const result = await list();
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('Should return a list of users', async () => {
    await UserModel.create({
      name: 'usuario',
      email: 'correo2@gmail.com',
      password: '123',
    });
    await UserModel.create({
      name: 'usuario',
      email: 'correo3@gmail.com',
      password: '123',
    });

    const result = await list();

    expect(result).toHaveLength(2);
    expect(result[0].name).toEqual('usuario');
    expect(result[0].email).toEqual('correo2@gmail.com');
  });
});
