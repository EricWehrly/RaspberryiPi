const { App } = require('@slack/bolt');
const requestHandler = require('./requestHandler');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message(async ({ message, say }) => {
  if (message.text.includes('request video')) {
    try {
      const response = await requestHandler.handleRequest(message.text);
      await say(`Request received: ${response}`);
    } catch (error) {
      await say(`Error: ${error.message}`);
    }
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Slack bot is running!');
})();
