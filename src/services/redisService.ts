import InstanceManager from "../utils/instanceManager";
import { Redis } from "ioredis";

class RedisService {
  private redis: Redis | null = null;

  useDb(dbIndex: number): void {
    this.redis = InstanceManager.useDb(dbIndex);
  }

  private checkInstance(): void {
    if (!this.redis) {
      throw new Error("No Redis database selected. Call useDb(dbIndex) first.");
    }
  }

  async setKey(
    key: string,
    value: string,
    ttl: number | null = null
  ): Promise<boolean> {
    this.checkInstance();
    try {
      if (ttl) {
        await this.redis!.set(key, value, "EX", ttl);
      } else {
        await this.redis!.set(key, value);
      }
      return true;
    } catch {
      return false;
    }
  }

  async getKey(key: string): Promise<string | null> {
    this.checkInstance();
    try {
      return this.redis!.get(key);
    } catch {
      return null;
    }
  }

  async deleteKey(key: string): Promise<boolean> {
    this.checkInstance();
    try {
      const result = await this.redis!.del(key);
      return result > 0; // Returns true if the key was deleted
    } catch {
      return false;
    }
  }
  async keyExists(key: string): Promise<boolean> {
    this.checkInstance();
    try {
      const exists = await this.redis!.exists(key);
      return exists > 0; // Returns true if the key exists
    } catch {
      return false;
    }
  }

  async addToSet(setKey: string, ...values: string[]): Promise<boolean> {
    this.checkInstance();
    try {
      await this.redis!.sadd(setKey, ...values);
      return true;
    } catch {
      return false;
    }
  }

  async getSetMembers(setKey: string): Promise<string[] | null> {
    this.checkInstance();
    try {
      return this.redis!.smembers(setKey);
    } catch {
      return null;
    }
  }

  async removeFromSet(setKey: string, ...values: string[]): Promise<boolean> {
    this.checkInstance();
    try {
      const result = await this.redis!.srem(setKey, ...values);
      return result > 0; // Returns true if values were removed
    } catch {
      return false;
    }
  }

  async setExists(setKey: string): Promise<boolean> {
    this.checkInstance();
    try {
      const exists = await this.redis!.exists(setKey);
      return exists > 0; // Returns true if the set exists
    } catch {
      return false;
    }
  }
}

export default new RedisService();
