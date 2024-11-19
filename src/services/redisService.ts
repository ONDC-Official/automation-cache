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
  ): Promise<string> {
    this.checkInstance();
    if (ttl) {
      await this.redis!.set(key, value, "EX", ttl);
    } else {
      await this.redis!.set(key, value);
    }
    return `Key ${key} set successfully.`;
  }

  async getKey(key: string): Promise<string | null> {
    this.checkInstance();
    return this.redis!.get(key);
  }

  async deleteKey(key: string): Promise<string> {
    this.checkInstance();
    const result = await this.redis!.del(key);
    return result ? `Key ${key} deleted.` : `Key ${key} not found.`;
  }

  async keyExists(key: string): Promise<string> {
    this.checkInstance();
    const exists = await this.redis!.exists(key);
    return exists ? `Key ${key} exists.` : `Key ${key} does not exist.`;
  }

  async addToSet(setKey: string, ...values: string[]): Promise<string> {
    this.checkInstance();
    await this.redis!.sadd(setKey, ...values);
    return `Values added to set ${setKey}.`;
  }

  async getSetMembers(setKey: string): Promise<string[]> {
    this.checkInstance();
    return this.redis!.smembers(setKey);
  }

  async removeFromSet(setKey: string, ...values: string[]): Promise<string> {
    this.checkInstance();
    const result = await this.redis!.srem(setKey, ...values);
    return result
      ? `Values removed from set ${setKey}.`
      : `Values not found in set ${setKey}.`;
  }

  async setExists(setKey: string): Promise<string> {
    this.checkInstance();
    const exists = await this.redis!.exists(setKey);
    return exists ? `Set ${setKey} exists.` : `Set ${setKey} does not exist.`;
  }
}

export default new RedisService();
