const { App } = require('@slack/bolt');
const requestHandler = require('./requestHandler');

function createSlackApp() {
  console.log('📱 Initializing Slack app...');
  
  // Log token info for debugging (only first few chars for security)
  const botTokenPreview = process.env.SLACK_BOT_TOKEN ? 
    `${process.env.SLACK_BOT_TOKEN.substring(0, 5)}...` : 'undefined';
  const appTokenPreview = process.env.SLACK_APP_TOKEN ? 
    `${process.env.SLACK_APP_TOKEN.substring(0, 5)}...` : 'undefined';
  console.log(`Bot token preview: ${botTokenPreview}`);
  console.log(`App token preview: ${appTokenPreview}`);

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    // Add custom Socket Mode client options
    // Documentation: https://slack.dev/bolt-js/concepts#socket-mode
    customClientArgs: {
      socketMode: {
        // Socket Mode reconnection parameters
        // https://slack.dev/node-slack-sdk/socket-mode#handle-connections-and-disconnections
        reconnect: true,                   // Boolean: Enable automatic reconnection
        reconnectDecay: 1.5,               // Factor: Exponential backoff multiplier (delay * decay^attempts)
        reconnectJitter: 0.5,              // Factor: Random jitter ratio to prevent reconnection storms
        reconnectDelay: 3000,              // Milliseconds: Initial delay before first reconnection attempt
        maxReconnectionAttempts: 10        // Count: Maximum reconnection attempts before giving up
      }
    }
  });

  // Add connection event listeners
  if (app.client.socket) {
    app.client.socket.on('connected', () => {
      console.log('🟢 Socket Mode connected successfully');
    });
    
    app.client.socket.on('disconnected', () => {
      console.log('🟠 Socket Mode disconnected, will attempt to reconnect');
    });
    
    app.client.socket.on('connection_error', (error) => {
      console.error('🔴 Socket Mode connection error:', error.message);
    });
  }

  // Add error handler before other listeners
  app.error(async (error) => {
    console.error('🔴 Slack app error:', error);
  });

  app.message(async ({ message, say, logger }) => {
    console.log('📨 Received message:', JSON.stringify(message));
    
    try {
      if (message.text) {
        console.log('🎬 Processing video request...');
        try {
          const response = await requestHandler.handleRequest(message.text);
          console.log('✅ Request handled successfully, responding to user');
          await say(`Request received: ${response}`);
        } catch (error) {
          console.error('❌ Request handler error:', error.message);
          await say('Sorry, there was an error processing your request.');
        }
      }
    } catch (error) {
      console.error('❌ Error in message handler:', error);
    }
  });

  return app;
}

async function updateBotStatus(app, status_text, status_emoji) {
  try {
    await app.client.users.profile.set({
      profile: {
        status_text: status_text,
        status_emoji: status_emoji
      }
    });
    console.log('✅ Bot status updated successfully');
  } catch (error) {
    console.error('❌ Failed to update bot status:', error.message);
  }
}

module.exports = {
  createSlackApp,
  updateBotStatus
};
