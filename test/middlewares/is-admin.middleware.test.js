import isAdminMiddleware from '../../src/middlewares/is-admin.middleware';
import UserModel from '../../src/models/user/user.model';


jest.mock('../../src/models/user/user.model'); 
describe('isAdminMiddleware', () => {
  it('should call next() when user is an admin', async () => {
    const user = { isAdmin: true };
    UserModel.findById.mockResolvedValue(user);

    const req = { userId: '123' };
    const res = {};
    const next = jest.fn();

    await isAdminMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should return an HTTPError when user is not an admin', async () => {
    const user = { isAdmin: false }; 
    UserModel.findById.mockResolvedValue(user);

    const req = { userId: '123' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await isAdminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      name: 'forbidden_not_admin',
      message: 'the users is not admin',
      code: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error when UserModel.findById throws an error', async () => {
    const error = new Error('An error occurred');
    UserModel.findById.mockRejectedValue(error);

    const req = { userId: '123' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await isAdminMiddleware(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});