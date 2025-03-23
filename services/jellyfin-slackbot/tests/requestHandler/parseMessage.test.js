const requestHandler = require('../../src/requestHandler');

// Extract the parseMessage function for testing
// Since it's not exported directly, we need to make it available for testing
const parseMessage = requestHandler.parseMessage || 
  // If not exported, we can't test it directly without modifying the original file
  (() => { throw new Error('parseMessage function is not exported from requestHandler'); })();

describe('parseMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  test('should extract movie title from "request movie" format', () => {
    const message = 'request movie The Shawshank Redemption';
    const result = parseMessage(message);
    expect(result).toBe('The Shawshank Redemption');
  });

  test('should extract TV show title from "request tv" format', () => {
    const message = 'request tv Breaking Bad';
    const result = parseMessage(message);
    expect(result).toBe('Breaking Bad');
  });

  test('should extract video title from "request video" format', () => {
    const message = 'request video The Matrix';
    const result = parseMessage(message);
    expect(result).toBe('The Matrix');
  });

  test('should extract show title from "request show" format', () => {
    const message = 'request show Game of Thrones';
    const result = parseMessage(message);
    expect(result).toBe('Game of Thrones');
  });

  test('should handle mixed case in request format', () => {
    const message = 'ReQuEsT MoViE Inception';
    const result = parseMessage(message);
    expect(result).toBe('Inception');
  });

  test('should handle extra spaces in the message', () => {
    const message = '  request   movie    Pulp   Fiction  ';
    const result = parseMessage(message);
    expect(result).toBe('Pulp   Fiction');
  });

  test('should return trimmed message when not in request format', () => {
    const message = 'The Godfather';
    const result = parseMessage(message);
    expect(result).toBe('The Godfather');
  });

  test('should return trimmed message for incomplete request format', () => {
    const message = 'request The Lord of the Rings';
    const result = parseMessage(message);
    expect(result).toBe('request The Lord of the Rings');
  });

  test('should handle empty string input', () => {
    const message = '';
    const result = parseMessage(message);
    expect(result).toBe('');
  });
});
