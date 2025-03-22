const { createSlackApp, updateBotStatus } = require('./slackApp');
const { checkJellyseerrHealth } = require('./jellyseerClient');

const requiredEnvVars = [
  'SLACK_BOT_TOKEN',
  'SLACK_APP_TOKEN',
  'SLACK_SIGNING_SECRET',
  'JELLYSEERR_API_URL',
  'JELLYSEERR_API_KEY'
];

// Add global unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  // Check for the common socket mode disconnect error
  if (reason instanceof Error && reason.message.includes("Unhandled event 'server explicit disconnect'")) {
    console.error('🔴 Slack socket disconnected - reconnection should happen automatically');
    return;
  }
  
  // For other errors, just show the error message without the full stack trace
  const errorMessage = reason instanceof Error ? reason.message : String(reason);
  console.error(`🔴 Unhandled Promise Rejection: ${errorMessage}`);
  
  // For debugging purposes, enable this to see full stack traces
  if (process.env.DEBUG_MODE === 'true') {
    console.error('Full error:', reason);
    console.error('Promise:', promise);
  }
});

function validateEnvironment() {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]?.length);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}

// Start the app
(async () => {
  console.log('🚀 Starting server...');
  try {
    validateEnvironment();
    await checkJellyseerrHealth();
    
    const app = createSlackApp();
    
    // Comment out the status update function call since it's causing errors
    // await updateBotStatus(app, "Online", ":white_check_mark:");
    
    console.log('🌐 Starting Slack app listener...');
    await app.start(process.env.PORT || 3000);
    console.log('✅ Bot is running!');
  } catch (error) {
    console.error('🔴 Failed to start app:', error);
    process.exit(1);
  }
})();
