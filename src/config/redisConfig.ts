import { Redis } from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;

const redisInstances: Record<number, Redis> = {};

export const getRedisInstance = (dbIndex: number = 0): Redis => {
  if (redisInstances[dbIndex]) {
    return redisInstances[dbIndex];
  }

  const redis = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    db: dbIndex,
  });

  redis.on("connect", () => console.log(`Connected to Redis DB: ${dbIndex}`));
  redis.on("error", (err) =>
    console.error(`Redis Error [DB: ${dbIndex}]:`, err)
  );

  redisInstances[dbIndex] = redis;
  return redis;
};
