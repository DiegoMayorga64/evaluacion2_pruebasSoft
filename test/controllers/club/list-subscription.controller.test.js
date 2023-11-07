import listSubscriptions from '../../../src/controllers/club/list-subscriptions.controller';
import SubscriptionLogic from '../../../src/business-logic/subscription';

jest.mock('../../../src/business-logic/subscription');

describe('listSubscriptions', () => {
  test('should list subscriptions and return 200 status with subscriptions', async () => {
    const req = {
      userId: 'user123',
      params: {
        clubId: 'club456',
      },
    };
    const res = {
      send: jest.fn(),
    };
    const subscriptions = [
      { id: 'sub1', name: 'Subscription 1' },
      { id: 'sub2', name: 'Subscription 2' },
    ];

    SubscriptionLogic.listByClub.mockResolvedValue(subscriptions);

    await listSubscriptions(req, res);

    expect(SubscriptionLogic.listByClub).toHaveBeenCalledWith({
      clubId: 'club456',
      userId: 'user123',
    });
    expect(res.send).toHaveBeenCalledWith({ subscriptions });
  });

  test('should handle errors and return an error response', async () => {
    const req = {
      userId: 'user123',
      params: {
        clubId: 'club456',
      },
    };
    const res = {
      send: jest.fn(),
    };

    SubscriptionLogic.listByClub.mockRejectedValue(new Error('Test error'));

    await listSubscriptions(req, res);

    expect(SubscriptionLogic.listByClub).toHaveBeenCalledWith({
      clubId: 'club456',
      userId: 'user123',
    });
    expect(res.send).not.toHaveBeenCalled(); 
    expect(res.status).toHaveBeenCalledWith(500); 
    expect(res.send).toHaveBeenCalledWith({ error: 'Test error' });
  });
});