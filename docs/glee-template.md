---
title: "Create AsyncAPI document"
weight: 170
---
This tutorial teaches you how to create a simple glee template. You'll use the AsyncAPI document and the template you develop to generate Javascript code. Additionally, you'll create template code with a reusable component to reuse the custom functionality you create and test your code using an WS client.

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

<!-- TODO -->