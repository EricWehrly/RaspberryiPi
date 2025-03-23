const { handleRequest } = require('../../src/requestHandler');
const axios = require('axios');

// Mock axios to prevent actual API calls
jest.mock('axios');

describe('handleRequest', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Set environment variables needed by the functions
    process.env.JELLYSEERR_API_URL = 'https://jellyseerr-api.example.com';
    process.env.JELLYSEERR_API_KEY = 'test-api-key';
  });

  test('should return message and not call submitMediaRequest when no results found', async () => {
    // Mock axios.get to return empty results
    axios.get.mockResolvedValueOnce({ data: { results: [] } });
    
    const result = await handleRequest('request movie nonexistent');
    
    // Verify search was called but not submit
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).not.toHaveBeenCalled();
    
    // Verify correct return type and content includes query
    expect(typeof result).toBe('string');
    expect(result).toContain('No results found');
    expect(result).toContain('nonexistent');
  });

  test('should submit media request when results are found', async () => {
    const mockMedia = { 
      id: 123, 
      title: 'Test Movie', 
      mediaType: 'movie' 
    };
    
    // Mock axios responses for both API calls
    axios.get.mockResolvedValueOnce({ data: { results: [mockMedia] } });
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    
    const result = await handleRequest('request movie Test Movie');
    
    // Verify both APIs were called
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(1);
    
    // Verify post was called with correct media ID
    expect(axios.post.mock.calls[0][1]).toHaveProperty('mediaId', 123);
    
    // Verify return is a string
    expect(typeof result).toBe('string');
    expect(result).toContain('Successfully requested');
  });

  test('should correctly parse different request formats', async () => {
    const mockMovie = { id: 123, title: 'Inception', mediaType: 'movie' };
    
    axios.get.mockResolvedValueOnce({ data: { results: [mockMovie] } });
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    
    await handleRequest('request movie Inception');
    
    // Verify search was called with the correct query
    expect(axios.get.mock.calls[0][1].params.query).toBe('Inception');
  });

  test('should throw error when media request submission fails', async () => {
    const mockMedia = { id: 456, title: 'Error Movie', mediaType: 'movie' };
    const requestError = new Error('API Error');
    requestError.response = { data: { message: 'API Error details' } };
    
    axios.get.mockResolvedValueOnce({ data: { results: [mockMedia] } });
    axios.post.mockRejectedValueOnce(requestError);
    
    // Verify the error is propagated
    await expect(handleRequest('request movie Error Movie'))
      .rejects.toThrow('Failed to request');
    
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('should use the first result when multiple results are returned', async () => {
    const mockResults = [
      { id: 111, title: 'First Match', mediaType: 'movie' },
      { id: 222, title: 'Second Match', mediaType: 'movie' },
      { id: 333, title: 'Third Match', mediaType: 'movie' }
    ];
    
    axios.get.mockResolvedValueOnce({ data: { results: mockResults } });
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    
    await handleRequest('request movie Match');
    
    // Verify the first result was used for the request
    expect(axios.post.mock.calls[0][1]).toHaveProperty('mediaId', 111);
  });
});