import { broadcastPriceAlert } from '../../../src/services/alert.service';

describe('Alert Service', () => {
  let mockWebSocket;

  beforeEach(() => {
    mockWebSocket = {
      readyState: 1, // OPEN
      send: jest.fn()
    };
    clients.set(mockWebSocket, { 
      userId: 'user-123', 
      product: 'tomatoes' 
    });
  });

  test('should send alert to correct product subscribers', () => {
    broadcastPriceAlert('tomatoes', { price: 55 });
    expect(mockWebSocket.send).toHaveBeenCalled();
  });

  test('should not send to closed connections', () => {
    mockWebSocket.readyState = 3; // CLOSED
    broadcastPriceAlert('tomatoes', { price: 55 });
    expect(mockWebSocket.send).not.toHaveBeenCalled();
  });
});