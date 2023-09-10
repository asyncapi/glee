---
title: 'Introduction'
weight: 20
---

[Glee](https://github.com/asyncapi/glee) is a spec-first framework that helps you build server-side applications. That means it operates on the principle of defining the API specification (AsyncAPI) before diving into the actual implementation of the application logic. It leverages that principle to make you more productive:

- Glee ensures your code and AsyncAPI definition are on par, eliminating the problem of outdated documentation. By having both the code and the AsyncAPI definition in sync, you can ensure that the API documentation is always up to date, accurate, and reflects the current state of the application. Glee takes care of this automatically for you.
- Glee lets you focus on what matters and handles the rest for you. You only write the code for your business use-case. Glee takes care of performance, scalability, resilience, and everything you need to make your application production-ready.
- Glee validates the schema of the payload that it receives, if it doesn't conform to the schema that is defined in the AsyncAPI document, it throw an error telling user that the server received an invalid payload.

To summarize, the Glee offers the following features and process flow, as shown in the diagram below:
<!-- TODO -->
