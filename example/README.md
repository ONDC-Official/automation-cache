# Redis Cache Example

This example demonstrates how to use the Redis cache library in a simple Express API application.

## Overview

The example consists of:

1. A simple Express server that uses the Redis cache library
2. A test client script that interacts with the server
3. A mock Redis implementation to avoid requiring a real Redis server

## Setup

1. Build the main Redis cache library:

   ```
   cd ..
   npm run build
   ```

2. Install dependencies for the example:
   ```
   cd example
   npm install
   ```

## Running the Example

1. Start the server:

   ```
   npm start
   ```

2. In a separate terminal, run the test client:
   ```
   npm test
   ```

## API Endpoints

The example implements a simple session management API:

- `GET /` - Home endpoint
- `POST /sessions` - Create a new session
- `GET /sessions/:sessionId` - Retrieve a session
- `DELETE /sessions/:sessionId` - Delete a session

## How it Works

1. The server uses the Redis cache library to store and retrieve session data
2. The mock Redis implementation replaces the real Redis connection for ease of testing
3. The test client demonstrates CRUD operations on sessions

## Notes

- This example uses a mock Redis implementation. In a real-world scenario, you would use a real Redis server.
- The mock implementation in this example is for demonstration purposes only.
