const { searchMedia } = require('../../src/requestHandler');
const axios = require('axios');

// Mock axios to prevent actual API calls
jest.mock('axios');

describe('searchMedia', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set environment variables needed by the functions
    process.env.JELLYSEERR_API_URL = 'https://jellyseerr-api.example.com';
    process.env.JELLYSEERR_API_KEY = 'test-api-key';
    
    // Silence console logs during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  test('should return search results when API call is successful', async () => {
    const mockResults = [
      { id: 1, title: 'Movie 1', mediaType: 'movie' },
      { id: 2, title: 'Movie 2', mediaType: 'movie' },
      { id: 3, title: 'Movie 3', mediaType: 'movie' }
    ];
    
    axios.get.mockResolvedValueOnce({ data: { results: mockResults } });
    
    const results = await searchMedia('test query');
    
    // Verify API was called with correct parameters
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.JELLYSEERR_API_URL}/api/v1/search`,
      expect.objectContaining({
        params: { query: 'test%20query' },
        headers: { 'X-Api-Key': process.env.JELLYSEERR_API_KEY }
      })
    );
    
    // Verify results match mock data
    expect(results).toEqual(mockResults);
  });

  test('should handle empty search results', async () => {
    axios.get.mockResolvedValueOnce({ data: { results: [] } });
    
    const results = await searchMedia('nonexistent');
    
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(results).toEqual([]);
  });

  test('should return only top 3 results when more are available', async () => {
    const mockResults = [
      { id: 1, title: 'Movie 1', mediaType: 'movie' },
      { id: 2, title: 'Movie 2', mediaType: 'movie' },
      { id: 3, title: 'Movie 3', mediaType: 'movie' },
      { id: 4, title: 'Movie 4', mediaType: 'movie' },
      { id: 5, title: 'Movie 5', mediaType: 'movie' }
    ];
    
    axios.get.mockResolvedValueOnce({ data: { results: mockResults } });
    
    const results = await searchMedia('common movie name');
    
    expect(results.length).toBe(3);
    expect(results[0].id).toBe(1);
    expect(results[1].id).toBe(2);
    expect(results[2].id).toBe(3);
  });

  test('should properly URL encode the search query', async () => {
    axios.get.mockResolvedValueOnce({ data: { results: [] } });
    
    await searchMedia('movie with spaces & special characters!');
    
    // Verify the query was properly encoded in the API call
    const expectedEncodedQuery = encodeURIComponent('movie with spaces & special characters!');
    expect(axios.get.mock.calls[0][1].params.query).toBe(expectedEncodedQuery);
  });

  test('should handle API error and return empty array', async () => {
    const mockError = new Error('API error');
    mockError.response = { data: { message: 'Something went wrong' } };
    
    axios.get.mockRejectedValueOnce(mockError);
    
    const results = await searchMedia('test query');
    
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(results).toEqual([]);
    // We don't test console.error directly since we mocked it,
    // but we can verify the error was thrown and caught
  });
});
