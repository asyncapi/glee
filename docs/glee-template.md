---
title: "Create AsyncAPI Glee template"
weight: 170
---
This tutorial teaches you how to create a simple glee template. You'll use the AsyncAPI Glee template you develop to generate Javascript code. Additionally, you'll create template code with a reusable component to reuse the custom functionality you create and test your code using an WS server.

<CodeBlock>
{`asyncapi: '2.1.0'
info:
  title: Hello, Glee!
  version: 0.1.0

servers:
  websockets:
    url: ws://0.0.0.0:3000
    protocol: ws

channels:
  hello:
    publish:
      operationId: onHello
      message:
        $ref: '#/components/messages/hello'
    subscribe:
      message:
        $ref: '#/components/messages/hello'

components:
  messages:
    hello:
      payload:
        type: string`}
</CodeBlock>

Let's break it down into pieces:

<CodeBlock>
{`info:
  title: Hello, Glee!
  version: 0.1.0`}
</CodeBlock>

- The `info` section provides general information about the API, including its title and version.

Moving on, let's talk about the `servers` section.

<CodeBlock>
{`servers:
  mosquitto:
    url: ws://0.0.0.0:3000
    protocol: ws`}
</CodeBlock> 

The servers section defines the different servers where the API can be accessed. In this case, there is a single server named "websockets" that uses the WebSocket protocol (`ws`) and listens on the address `ws://0.0.0.0:3000`.

<!-- TODO -->
