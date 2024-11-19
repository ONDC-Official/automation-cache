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
import { redisService } from "ondc-automation-cache-lib";

// Select and use database 0
redisService.useDb(0);

(async () => {
  // Set a key with an expiration time of 1 hour (3600 seconds)
  await redisService.setKey("exampleKey", "exampleValue", 3600);

  // Get the value of the key
  console.log(await redisService.getKey("exampleKey"));

  // Add values to a Redis set
  await redisService.addToSet("exampleSet", "value1", "value2");

  // Get the members of the set
  console.log(await redisService.getSetMembers("exampleSet"));
})();
```
