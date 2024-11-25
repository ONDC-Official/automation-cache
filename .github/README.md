# ONDC Automation Cache Library

The ONDC Automation Cache Library is a utility designed for seamless integration with Redis. It provides a set of methods to easily interact with Redis for caching, managing keys, and working with Redis data structures.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Example](#example)
  <!-- - [API Reference](#api-reference)
  - [redisService Methods](#redisService-methods)
  - [License](#license) -->

## Installation

To get started with the ONDC Automation Cache Library, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project folder:
3. Install the dependencies:

```sh
npm i
```

## Configuration

Before using the library, you need to configure Redis. Follow these steps:

1. Create a .env file in the root directory of your project.

2. Add your Redis configuration to the .env file. You can reference the .env-example file for the required format.

## Usage

Once your environment is configured, you can start using the redisService in your project.

## Example

Here is a sample usage of the ONDC Automation Cache Library:

```js
import { RedisService } from "ondc-automation-cache-lib";

// Select and use database 0
RedisService.useDb(0);

import { RedisService } from "ondc-automation-cache-lib";

// Select and use database 0
RedisService.useDb(0);

(async () => {
  // Set a key with TTL
  const setResult = await RedisService.setKey(
    "example-key",
    "example-value",
    3600
  );
  console.log("Set key result:", setResult); // Outputs: true

  // Get a key
  const value = await RedisService.getKey("example-key");
  console.log("Value:", value); // Outputs: example-value

  // Check if a key exists
  const exists = await RedisService.keyExists("example-key");
  console.log("Key exists:", exists); // Outputs: true

  // Delete a key
  const deleteResult = await RedisService.deleteKey("example-key");
  console.log("Delete key result:", deleteResult); // Outputs: true

  // Check if the key exists after deletion
  const existsAfterDelete = await RedisService.keyExists("example-key");
  console.log("Key exists after delete:", existsAfterDelete); // Outputs: false
```
