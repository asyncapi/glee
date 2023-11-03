Given the additional details about the project's functionality and the environment variables, I'll adjust the README to reflect this information.

```markdown
# Slack Websocket API

This Slack Websocket API leverages the AsyncAPI specification to connect Slack with OpenAI's AI models. When a user reacts to a message on Slack, this API sends the reaction to OpenAI's server. ChatGPT then crafts a fun response, which is posted as a reply to the message thread on Slack.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

The API listens for reaction events in Slack, processes them through OpenAI's API to generate responses, and sends those back to Slack as a threaded message.

## Prerequisites

- Node.js (version 12 or higher)
- A Slack app with permissions to read reactions and post messages
- Access to OpenAI API

## Configuration

Before running the project, you must update the `asyncapi.yaml` file with the current `ticket` and `app_id` for the Slack WebSocket connection:

```yaml
channels:
  SlackEventStream:
    address: /link/?ticket=[ticket]&app_id=[app_id]
```

Replace `[ticket]` and `[app_id]` with the respective values for your Slack app.

## Usage

Set the environment variables by creating a `.env` file in the root of the project:

```plaintext
SLACK_HTTP=xoxb-**********
CHAT_API=openai_token
```

Start the API server with:

```sh
npm run dev
```

The API will now listen for Slack reaction events, interact with OpenAI, and post responses on Slack.

## Environment Variables

The following environment variables are necessary for the API to function:

- `SLACK_HTTP`: Your Slack app's OAuth token.
- `CHAT_API`: Your OpenAI API key.

Ensure these are set in your `.env` file or your deployment environment.