// import redis
const Redis = require("ioredis").default

// Create a Redis instance.
const redis = new Redis(
    {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    }
);

redis.on("connect", ()=>{
    console.log("server is conneced to redis")
})

redis.on("error", (err)=>{
    console.log(err)
})

module.exports = redis