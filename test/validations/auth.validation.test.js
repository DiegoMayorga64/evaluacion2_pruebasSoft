import { loginValidation } from '../../src/validations/auth.validations';

describe('loginValidation', () => {
  it('should pass with valid input', () => {
    const validInput = {
      email: 'example@example.com',
      password: 'secretpassword',
    };

    const { error } = loginValidation.validate(validInput);
    expect(error).toBe(null);
  });

  it('should fail with missing email', () => {
    const invalidInput = {
      password: 'secretpassword',
    };

    const { error } = loginValidation.validate(invalidInput);
    expect(error).not.toBe(null);
  });

  it('should fail with invalid email', () => {
    const invalidInput = {
      email: 'invalidemail',
      password: 'secretpassword',
    };

    const { error } = loginValidation.validate(invalidInput);
    expect(error).not.toBe(null);
  });

  it('should fail with missing password', () => {
    const invalidInput = {
      email: 'example@example.com',
    };

    const { error } = loginValidation.validate(invalidInput);
    expect(error).not.toBe(null);
  });
});