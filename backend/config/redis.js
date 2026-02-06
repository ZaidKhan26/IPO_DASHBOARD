const { createClient } = require("redis");
require("dotenv").config();

// Create client instance immediately
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));

const connectRedis = async () => {
    if (process.env.USE_REDIS === "true") {
        try {
            if (!redisClient.isOpen) {
                await redisClient.connect();
                console.log("✅ Redis Connected");
            }
        } catch (err) {
            console.error("❌ Redis Connection Failed:", err.message);
        }
    } else {
        console.log("⚠️ Redis skipped (USE_REDIS not true)");
    }
};

module.exports = { connectRedis, redisClient };
