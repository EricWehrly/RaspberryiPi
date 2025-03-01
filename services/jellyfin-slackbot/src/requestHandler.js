const axios = require('axios');

async function handleRequest(message) {
  console.log('📝 Parsing message:', message);
  const searchQuery = parseMessage(message);
  
  // First search for the media
  const searchResults = await searchMedia(searchQuery);
  
  if (!searchResults.length) {
    return `No results found for "${searchQuery}"`;
  }
  
  // Use the first result to submit a request
  const requestResult = await submitMediaRequest(searchResults[0]);
  return requestResult;
}

function parseMessage(message) {
  // Extract the search query from message
  // This regex matches "request video [title]" or similar patterns
  const match = message.match(/request\s+(video|movie|tv|show)\s+(.+)/i);
  return match ? match[2].trim() : message.trim();
}

async function searchMedia(query) {
  console.log(`🔍 Searching for: "${query}"`);
  try {
    const response = await axios.get(`${process.env.JELLYSEERR_API_URL}/api/v1/search`, {
      params: { query },
      headers: { 'X-Api-Key': process.env.JELLYSEERR_API_KEY }
    });
    
    console.log(`✅ Search found ${response.data.results.length} results`);
    return response.data.results.slice(0, 3); // Return top 3 results
  } catch (error) {
    console.error('❌ Search error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return [];
  }
}

async function submitMediaRequest(media) {
  console.log(`🎬 Submitting request for: ${media.title || media.name}`);
  try {
    // API reference: https://github.com/fallenbagel/jellyseerr/blob/main/overseerr-api.yml
    const requestPayload = {
      mediaId: media.id,
      mediaType: media.mediaType, // "movie" or "tv"
      // For TV shows, you might want to request all seasons:
      // seasons: media.mediaType === 'tv' ? [1, 2, 3] : undefined
    };
    
    const response = await axios.post(
      `${process.env.JELLYSEERR_API_URL}/api/v1/request`, 
      requestPayload,
      { headers: { 'X-Api-Key': process.env.JELLYSEERR_API_KEY } }
    );
    
    console.log('✅ Request submitted successfully');
    return `Successfully requested ${media.title || media.name}!`;
  } catch (error) {
    console.error('❌ Request submission error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw new Error(`Failed to request: ${error.message}`);
  }
}

module.exports = {
  handleRequest
};
