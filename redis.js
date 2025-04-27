const { Redis } = require("ioredis");
const configs = require("./configs");

const redis = new Redis(configs.redis.port);

const test = async () => {
  const keys = await redis.keys("*");

};

test();

module.exports = redis;
