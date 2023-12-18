# Slack Websocket API

This Slack Websocket API leverages the AsyncAPI specification to connect Slack with OpenAI's AI models. When a user reacts to a message on Slack, this API sends the reaction to OpenAI's server. ChatGPT then crafts a fun response, which is posted as a reply to the message thread on Slack.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Overview

The API listens for reaction events in Slack, processes them through OpenAI's API to generate responses, and sends those back to Slack as a threaded message.

## Prerequisites

- Node.js (version 12 or higher)
- A Slack app with permissions to read reactions and post messages
- Access to OpenAI API

## Usage

Set the environment variables by creating a `.env` file in the root of the project:

```plaintext
SLACK_APP_TOKEN=<xapp-token>
CHAT_API=<openai_token>
SLACK_HTTP=<xoxb-token>
```

Start the API server with:

```sh
npm run dev
```

The API will now listen for Slack reaction events, interact with OpenAI, and post responses on Slack.