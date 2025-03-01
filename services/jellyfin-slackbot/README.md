## Slack Bot Setup Instructions

### Slack Bot Creation

1. Go to the [Slack API](https://api.slack.com/apps) and create a new app.
2. Choose a name for your app and select the workspace where you want to install it.
3. Once the app is created, navigate to the "OAuth & Permissions" section.
4. Add the following bot token scopes:
   - `channels:history`
   - `channels:read`
   - `chat:write`
   - `groups:history`
   - `groups:read`
   - `im:history`
   - `im:read`
   - `mpim:history`
   - `mpim:read`
5. Install the app to your workspace and copy the Bot User OAuth Token.
6. In the "Basic Information" section, locate the "Signing Secret" under "App Credentials".
   Copy this value as you'll need it for the configuration.

### Required Permissions & OAuth Setup

1. In the "OAuth & Permissions" section, ensure that the required bot token scopes are added.
2. Copy the Bot User OAuth Token and add it to your `.env` file as `SLACK_BOT_TOKEN`.

### Configuration Using `.env` File

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
   ```
   SLACK_BOT_TOKEN=your-slack-bot-token
   SLACK_SIGNING_SECRET=your-slack-signing-secret
   JELLYSEERR_API_URL=your-jellyseerr-api-url
   JELLYSEERR_API_KEY=your-jellyseerr-api-key
   ```

### Environment Variables

The following environment variables are required:

| Variable | Description |
|----------|-------------|
| SLACK_BOT_TOKEN | OAuth token starting with `xoxb-`. Found under "OAuth & Permissions" in your Slack app settings. Required for the bot to interact with Slack's APIs. |
| SLACK_SIGNING_SECRET | Used to verify requests are coming from Slack. Found under "Basic Information" in your Slack app settings. |
| JELLYSEERR_API_URL | Base URL for your Jellyseerr instance (e.g., `http://localhost:5055`). |
| JELLYSEERR_API_KEY | API key for Jellyseerr, generated in the Jellyseerr settings. |

Optional environment variables:

| Variable | Description |
|----------|-------------|
| SLACK_APP_TOKEN | Token starting with `xapp-`. **Only required if using Socket Mode**. Found under "Basic Information" in your Slack app settings. |
| PORT | Port for the HTTP server to listen on (default: 3000). Not needed if using Socket Mode. |

### Connection Modes

The bot supports two connection modes:

1. **HTTP Mode (default)** - Requires a public URL with proper request URLs configured in the Slack app settings
2. **Socket Mode** - No public URL required, but needs the additional SLACK_APP_TOKEN

To use Socket Mode, set `socketMode: true` in the App initialization and ensure you've set the SLACK_APP_TOKEN environment variable.

---

## Running the Slack Bot Using Docker and Docker Compose

### Docker Setup

1. Create a `Dockerfile` in the root directory of the project with the following content:
   ```
   FROM node:14

   WORKDIR /app

   COPY package*.json ./

   RUN npm install

   COPY . .

   CMD ["node", "src/index.js"]
   ```

2. Create a `docker-compose.yml` file in the root directory of the project with the following content:
   ```
   version: '3'

   services:
     slack-bot:
       build: .
       environment:
         - SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}
         - SLACK_SIGNING_SECRET=${SLACK_SIGNING_SECRET}
         - JELLYSEERR_API_URL=${JELLYSEERR_API_URL}
         - JELLYSEERR_API_KEY=${JELLYSEERR_API_KEY}
       ports:
         - "3000:3000"
   ```

### Running the Slack Bot

1. Build the Docker image:
   ```
   docker-compose build
   ```

2. Start the Slack bot:
   ```
   docker-compose up
   ```

3. The Slack bot should now be running and listening for messages in the configured channel.
