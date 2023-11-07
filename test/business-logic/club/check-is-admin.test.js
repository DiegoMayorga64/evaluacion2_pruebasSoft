import { expect, jest } from '@jest/globals';
import ClubModel from '../../../src/models/club/club.model';
import isAdmin from '../../../src/business-logic/club/check-is-admin'
import ClubLogic from '../../../src/business-logic/club';
import HTTPError from '../../../src/errors/http.error';

jest.mock('../../../src/business-logic/club');

describe('Business logic: Club: Check-is-admin',()=>{

    afterEach(async ()=>{
        jest.resetAllMocks();
        await ClubModel.deleteMany({});
    });

    it('should throw HTTPError with code 403 if user is not the admin of the club', async () => {
        const error = new HTTPError({ name: 'error', message: 'some-error', code: 403 });
        ClubLogic.checkIfUserIsAdmin.mockResolvedValue(error);
        
        try {
          await isAdmin({ clubId: 'club123', userId: 'user123' });
          throw new Error('unexpected error');
        } catch (error) {
          expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalled();
          expect(error).not.toBeNull();
          expect(error.name).toEqual('error');
          expect(error.message).toEqual('some-error');
        }
      });
    
      it('should not throw an error if user is the admin of the club', async () => {
        ClubLogic.checkIfUserIsAdmin.mockResolvedValue({ _id: 'club123', admin: 'user123' });
    
        const result = await isAdmin({ _id: 'club123', admin: 'user123' });
        expect(result.clubId).toEqual('club123');
        expect(result.userId).toEqual('user123');
      });
})