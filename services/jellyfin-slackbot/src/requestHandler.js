const axios = require('axios');

async function handleRequest(message) {
  const videoRequest = parseMessage(message);
  const response = await forwardToJellyseerr(videoRequest);
  return response;
}

function parseMessage(message) {
  // Extract video request details from the message
  // This is a placeholder implementation, adjust as needed
  return {
    title: message.split('request video ')[1] || message
  };
}

async function forwardToJellyseerr(videoRequest) {
  try {
    const response = await axios.post(process.env.JELLYSEERR_API_URL, videoRequest);
    return response.data;
  } catch (error) {
    throw new Error('Failed to forward request to Jellyseerr');
  }
}

module.exports = {
  handleRequest
};
