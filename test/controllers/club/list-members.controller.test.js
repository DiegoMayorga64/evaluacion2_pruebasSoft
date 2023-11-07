import listMembers from '../../../src/controllers/club/list-members.controller'; 
import MemberLogic from '../../../src/business-logic/member';

const mockReq = {
  userId: 'user123',
  params: {
    clubId: 'club456',
  },
};

const mockRes = {
  send: jest.fn(),
};

jest.mock('../../../src/business-logic/member', () => ({
  listByClub: jest.fn(),
}));

jest.mock('../../../src/errors/error-response', () => ({
  returnErrorResponse: jest.fn(),
}));

describe('listMembers', () => {
  it('should list members and return a 200 response', async () => {

    const fakeMembers = ['member1', 'member2'];
    MemberLogic.listByClub.mockResolvedValue(fakeMembers);

    await listMembers(mockReq, mockRes);


    expect(MemberLogic.listByClub).toHaveBeenCalledWith({ clubId: 'club456', userId: 'user123' });

   
    expect(mockRes.send).toHaveBeenCalledWith({ members: fakeMembers });
  });

  it('should handle errors and return an error response', async () => {

    MemberLogic.listByClub.mockRejectedValue(new Error('Something went wrong'));

    await listMembers(mockReq, mockRes);

    expect(returnErrorResponse).toHaveBeenCalledWith({ error: expect.any(Error), res: mockRes });
  });
});