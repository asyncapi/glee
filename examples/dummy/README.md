## Introduction

This project is an example websocket-based application that simulates email sending and forwards messages to a Mosquitto server. It's a great example of real-time data handling and integration with MQTT protocol.

## Getting Started

### Installation

To set up the project, follow these simple steps:

1. Clone the Glee repository to your local machine.
2. Navigate to the project directory (examples/dummy).
3. Run the following command to install all the required dependencies:

   ```bash
   npm i
   ```

### Running the Project

After installing the dependencies, you can start the project by running:

```bash
npm run dev
```

This will start the development server on `localhost:3005`.

## Making a WebSocket Connection

To interact with the WebSocket server, you can use a WebSocket client like [websocat](https://github.com/vi/websocat). Here's how you can connect and send a message:

1. Open a terminal and connect to the WebSocket server using the following command:

   ```bash
   websocat ws://localhost:3005/user/signedup
   ```

2. Once connected, you can send a message in JSON format. For example:

   ```json
   {"displayName": "John Doe", "email": "ffdd@ff.com"}
   ```

## Behind the Scenes

When you send a message:

- The `receiveUserSignedUp` function is triggered.
- The application simulates sending an email to the provided email address.
- It then forwards the message to the Mosquitto server at `test.mosquitto.org`.