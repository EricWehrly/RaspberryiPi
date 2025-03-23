const requestHandler = require('../src/requestHandler');

describe('requestHandler', () => {
  test('should handle successful video request', async () => {
    const message = 'request video Test Video';
    const response = await requestHandler.handleRequest(message);
    expect(response).toEqual({ success: true, message: 'Request forwarded to Jellyseerr' });
  });

  test('should handle error in video request', async () => {
    const message = 'request video Invalid Video';
    await expect(requestHandler.handleRequest(message)).rejects.toThrow('Failed to forward request to Jellyseerr');
  });

  test('should handleRequest function', async () => {
    // Add your test implementation here
  });
});
