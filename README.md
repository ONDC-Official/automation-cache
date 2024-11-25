# automation-cache

```js
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
})();
```
