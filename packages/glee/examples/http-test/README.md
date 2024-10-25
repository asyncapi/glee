
# HTTP Test Project

## Overview
This project is a test suite for evaluating the HTTP server functionality in the Glee framework. It sets up an HTTP server on port 3000, and upon receiving a POST request, it sends multiple test requests to `https://httpbin.org/` to verify the operational aspects of the server.


### Installation
1. Navigate to the project directory:
   ```sh
   cd examples/http-test
   ```
3. Install the necessary Node.js packages:
   ```sh
   npm install
   ```

### Running the Server
1. Start the HTTP server by running:
   ```sh
   npm run dev
   ```
2. The server will start on `http://localhost:3000`. 

### Testing the Server
Send a POST request to `http://localhost:3000` using a tool like cURL or Postman. The server, upon receiving the request, will initiate several test requests to `https://httpbin.org/` and validate the functionality.