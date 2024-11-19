# automation-cache

```js
import { redisService } from "ondc-automation-cache-lib";

// Select and use database 0
redisService.useDb(0);

(async () => {
  await redisService.setKey("exampleKey", "exampleValue", 3600);
  console.log(await redisService.getKey("exampleKey"));

  await redisService.addToSet("exampleSet", "value1", "value2");
  console.log(await redisService.getSetMembers("exampleSet"));
})();
```
