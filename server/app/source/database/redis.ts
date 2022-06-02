import { createClient, RedisClientType } from 'redis';

class RedisClient {
  private connection: RedisClientType;
  
  /**
   * Stablish a connection to the Redis Server
   */
  constructor () {
    this.connection = createClient({
      url: `redis://${process.env.REDIS_HOST}`
    });
    this.connection.connect()
  }

  /**
   * Return a value based on the key informed
   * @param key String
   * @returns A value stringified
   */
  async get(key: string): Promise<string | null> {
    return await this.connection.get(key);
  }

  /**
   * Storage a new value or updates an existing one
   * @param key Field name
   * @param value Value
   * @returns void
   */
  async set(key: string, value: string): Promise<void> {
    await this.connection.set(key, value);
  }

  /**
   * Delete a register from Redis
   * @param key Field name to be deleted
   */
  async del(key: string): Promise<void> {
    await this.connection.del(key);
  }
}

export default RedisClient;