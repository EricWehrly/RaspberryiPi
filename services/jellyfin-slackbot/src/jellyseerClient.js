const axios = require('axios');

// Reference: https://github.com/fallenbagel/jellyseerr/blob/master/server/routes/status.ts
async function checkJellyseerrHealth() {
  try {
    // Using status endpoint as it requires auth and is lightweight
    const response = await axios.get(`${process.env.JELLYSEERR_API_URL}/api/v1/status`, {
      headers: { 'X-Api-Key': process.env.JELLYSEERR_API_KEY },
      timeout: 5000 // 5 second timeout
    });
    console.log('✅ Jellyseerr connection test successful');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.error('❌ Jellyseerr server unreachable:', error.message);
    } else if (error.response) {
      console.error('❌ Jellyseerr API error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    } else {
      console.error('❌ Unknown error:', error.message);
    }
    throw error;
  }
}

module.exports = {
  checkJellyseerrHealth
};
