# RaspberryiPi

Repository for tracking, backing, and enabling rebuilding of Eric's primary domestic Pi.

---

## Usage

To get into the pi, right now, we've got an id_rsa that may or may not be backed up ...
With it installed, we can get in using

`ssh -i ~/.ssh/id_rsa pi@rpi4.local`

---

## LLM-Assisted Workflow and Copilot Tools

This repository has been expanded to support LLM-assisted workflow with copilot tools. The `.github` and `.vscode` folders contain copilot prompt augmentation instructions to guide the LLM for home server projects.

---

## Project Structure and Working Patterns

This repository is intended for operating a home server off of a Raspberry Pi. It contains scripts and configurations for various services and tools. The repository is structured to be used across multiple devices, making it easier to migrate where and how the various services are hosted.

### Folder Structure

- `.github/`: Contains GitHub-specific files, including copilot prompt augmentation instructions.
- `.vscode/`: Contains VS Code-specific files, including settings to enhance copilot prompt augmentation.
- `cambox/`: Contains scripts related to the cambox service.
- `html/`: Contains HTML files for the web interface.
- `scripts/`: Contains various scripts for setting up and managing the home server.
- `TVRemote/`: Contains files related to the TV remote control service.

### Working Patterns

- Use the provided scripts and configurations to set up and manage the home server services.
- Follow the copilot prompt augmentation instructions in the `.github` and `.vscode` folders to enhance the LLM-assisted workflow.
- Refer to the documentation and examples provided in the repository for guidance on using the scripts and configurations.
- Ensure that any dependencies or prerequisites for the services and tools are met.
- Troubleshoot any potential issues using the provided troubleshooting steps.

---

## Multi-Device Usage

This repository is designed to be used across multiple devices, making it easier to migrate where and how the various services are hosted. The scripts and configurations are intended to be flexible and adaptable to different environments.

---

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

### Required Permissions & OAuth Setup

1. In the "OAuth & Permissions" section, ensure that the required bot token scopes are added.
2. Copy the Bot User OAuth Token and add it to your `.env` file as `SLACK_BOT_TOKEN`.

### Configuration Using `.env` File

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
   ```
   SLACK_BOT_TOKEN=your-slack-bot-token
   JELLYSEERR_API_URL=your-jellyseerr-api-url
   ```

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
         - JELLYSEERR_API_URL=${JELLYSEERR_API_URL}
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
