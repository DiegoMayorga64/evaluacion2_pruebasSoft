import { expect } from '@jest/globals';
import AuthLogic from '../../../src/business-logic/auth'
import login from '../../../src/business-logic/auth/login'

const req = {
  body: {
    email : 'hola@gmail.com',
    password: '1234gmail'
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe('login function', () => {
  it('should return a 200 status and a token on success', async () => {
    
    AuthLogic.login = jest.fn().mockResolvedValue('testToken');

    
    await login(req, res);

    
    expect(AuthLogic.login).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: 'testToken' });
  });

  it('should handle validation errors', async () => {
  
    AuthLogic.login = jest.fn().mockRejectedValue(new Error('Validation error'));

    
    await login(req, res);

    expect(AuthLogic.login).toHaveBeenCalledWith(req.body);

    
    expect(res.status).toHaveBeenCalledWith(500);
  });
});