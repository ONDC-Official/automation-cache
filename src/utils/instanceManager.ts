import { Redis } from "ioredis";
import { getRedisInstance } from "../config/redisConfig";

class InstanceManager {
  private currentDbIndex: number | null = null;
  private redis: Redis | null = null;

  /**
   * Initializes or switches to a specific Redis database instance.
   * @param dbIndex - The database index to use.
   * @returns The Redis instance.
   */
  useDb(dbIndex: number): Redis {
    if (this.currentDbIndex !== dbIndex) {
      this.redis = getRedisInstance(dbIndex);
      this.currentDbIndex = dbIndex;
      console.log(`Switched to Redis DB: ${dbIndex}`);
    }

    return this.redis!;
  }

  /**
   * Retrieves the currently active Redis instance.
   * Throws an error if no instance has been initialized.
   * @returns The active Redis instance.
   */
  getInstance(): Redis {
    if (!this.redis) {
      throw new Error(
        "No Redis instance initialized. Call useDb(dbIndex) first."
      );
    }

    // TypeScript recognizes `this.redis` as non-null after the above check
    return this.redis!;
  }
}

export default new InstanceManager();
