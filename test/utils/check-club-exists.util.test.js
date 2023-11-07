import checkClubExists from '../../src/utils/check-club-exists.util';
import ClubLogic from '../../src/business-logic/club';
import HTTPError from '../../src/errors/http.error';

describe('checkClubExists', () => {
  it('debería arrojar un error si el club no existe', async () => {
    const errorObject = new HTTPError('Club no encontrado', 404);


    ClubLogic.get = jest.fn().mockResolvedValue(null);

    try {
      await checkClubExists({ clubId: 'clubId', errorObject });

      expect(true).toBe(false);
    } catch (error) {
     
      expect(error).toBe(errorObject);
    }
  });

  it('no debería arrojar un error si el club existe', async () => {

    ClubLogic.get = jest.fn().mockResolvedValue({ clubId: 'clubId' });

    try {
      await checkClubExists({ clubId: 'clubId', errorObject: new HTTPError('Club no encontrado', 404) });

      expect(true).toBe(true);
    } catch (error) {

      expect(true).toBe(false);
    }
  });
});