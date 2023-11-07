import Joi from 'joi';
import { addValidation } from '../../src/validations/member.validations'; // Asegúrate de ajustar la ruta

describe('addValidation', () => {
  it('should pass when valid data is provided', () => {
    const validData = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    };
    
    const { error } = Joi.validate(validData, addValidation);
    
    expect(error).toBeNull();
  });

  it('should fail when required data is missing', () => {
    const invalidData = {
      lastName: 'Doe',
      email: 'johndoe@example.com',
    };
    
    const { error } = Joi.validate(invalidData, addValidation);
    
    expect(error).toBeDefined();
  });

  it('should fail when invalid data is provided', () => {
    const invalidData = {
      name: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
    };
    
    const { error } = Joi.validate(invalidData, addValidation);
    
    expect(error).toBeDefined();
  });

});