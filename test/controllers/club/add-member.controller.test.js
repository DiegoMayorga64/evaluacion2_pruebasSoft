import { expect, jest } from '@jest/globals';
import MemberLogic from '../../../src/business-logic/member';

describe('addMember function', () => {
    it('debería agregar un miembro y devolver un código de estado 201', async () => {
      const req = {
        body: {
            email: '1234@gmail.com',
            name: 'prueba',
        },
        params: {
          clubId: 'clubId',
        },
        userId: 'userId', 
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      MemberLogic.create = jest.fn(() => Promise.resolve({ member: {} }));
  
      await addMember(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ member: {} });
    });
  
    it('debería devolver un error en caso de validación fallida', async () => {
      const req = {
        body: {
            email: '1234@gmail.com',
            name: 'prueba',
        },
        params: {
          clubId: 'clubId',
        },
        userId: 'userId',
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      const expectedError = new Error('Error de validación');
      addValidation.validateAsync = jest.fn(() => Promise.reject(expectedError));
  
      await addMember(req, res);
  
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(returnErrorResponse).toHaveBeenCalledWith({ error: expectedError, res });
    });
  });