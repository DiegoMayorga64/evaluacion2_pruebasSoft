import list from '../../../src/controllers/club/list.controller';
import ClubLogic from '../../../src/business-logic/club';

const mockResponse = {
  send: jest.fn(),
};

jest.mock('../../../src/business-logic/club', () => ({
  list: jest.fn(),
}));

describe('list', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw ClubList', async () => {
    const mockClubs = ['Club1', 'Club2'];
    ClubLogic.list.mockResolvedValue(mockClubs);

    const req = {};
    await list(req, mockResponse);

    expect(ClubLogic.list).toHaveBeenCalledTimes(1); 
    expect(mockResponse.send).toHaveBeenCalledWith({ clubs: mockClubs });
  });

  it('debe manejar errores y devolver una respuesta de error', async () => {
    const mockError = new Error('Error simulado');

    ClubLogic.list.mockRejectedValue(mockError);

    const req = {};
    await list(req, mockResponse);

    expect(ClubLogic.list).toHaveBeenCalledTimes(1); 
    expect(mockResponse.send).toHaveBeenCalledTimes(0); 
    expect(mockResponse.status).toHaveBeenCalledWith(500); 
    expect(mockResponse.send).toHaveBeenCalledWith({ error: 'Error simulado' }); 
  });
});