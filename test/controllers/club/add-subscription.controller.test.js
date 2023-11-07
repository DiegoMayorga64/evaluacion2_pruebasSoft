
import addSubscription from '../../../src/controllers/club/add-subscription.controller';
import SubscriptionLogic from '../../../src/business-logic/subscription';

const mockRequest = {
  body: { /* Coloca aquí los datos necesarios para la prueba */ },
  params: { clubId: 123 },
  userId: 456,
};

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

jest.mock('../../../src/business-logic/subscription', () => ({
  create: jest.fn(),
}));

describe('addSubscription', () => {
  it('debe responder con un estado 201 y la suscripción creada', async () => {
    const mockSubscription = { name: 'subscription', userId:'user' };

    SubscriptionLogic.create.mockResolvedValue(mockSubscription);

    await addSubscription(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.send).toHaveBeenCalledWith({ subscription: mockSubscription });
  });

  it('debe manejar errores y responder con un error', async () => {
    SubscriptionLogic.create.mockRejectedValue(new Error('Ocurrió un error'));


    await addSubscription(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Ocurrio un error');
  });
});