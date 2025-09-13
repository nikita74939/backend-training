import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL;

const redisClient = createClient({
    url: REDIS_URL
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
})

const connectRedis = async (): Promise<void> => {
    try {
        await redisClient.connect();
        console.log('Redis connected Ssccessfully🎉');
    } catch (e) {
        console.log('Redis connection failed😑', e);
    }
    
};

export { connectRedis, redisClient };

export const publishQueueUpdate = async (data: any): Promise<void> => {
    await redisClient.publish('queue-update', JSON.stringify(data));
}