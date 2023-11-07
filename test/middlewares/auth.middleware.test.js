import authMiddleware from '../../src/middlewares/auth.middleware';

describe('authMiddleware', () => {
  it('should call next() if a valid token is provided', () => {
    const req = { headers: { Authorization: 'Bearer valid_token' } };
    const res = {};
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(req.userId).toBeDefined();
    expect(next).toHaveBeenCalled();
  });

  it('should return an error if no token is provided', () => {
    const req = { headers: {} };
    const res = {};
    const next = jest.fn();

    const errorResponseMock = jest.fn();
    const originalReturnErrorResponse = require('../../src/errors/error-response').returnErrorResponse;
    require('../../src/errors/error-response').returnErrorResponse = errorResponseMock;

    authMiddleware(req, res, next);

    expect(errorResponseMock).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();

    // Restore the original returnErrorResponse function
    require('../../src/errors/error-response').returnErrorResponse = originalReturnErrorResponse;
  });

  it('should return an error if the token is invalid', () => {
    const req = { headers: { Authorization: 'Bearer invalid_token' } };
    const res = {};
    const next = jest.fn();

    const verifyTokenMock = jest.fn(() => {
      throw new Error('Invalid token');
    });
    const originalVerifyToken = require('../../src/utils/jwt.util').verifyToken;
    require('../../src/utils/jwt.util').verifyToken = verifyTokenMock;

    const errorResponseMock = jest.fn();
    const originalReturnErrorResponse = require('../../src/errors/error-response').returnErrorResponse;
    require('../../src/errors/error-response').returnErrorResponse = errorResponseMock;

    authMiddleware(req, res, next);

    expect(errorResponseMock).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();

    // Restore the original functions
    require('../../src/utils/jwt.util').verifyToken = originalVerifyToken;
    require('../../src/errors/error-response').returnErrorResponse = originalReturnErrorResponse;
  });
});