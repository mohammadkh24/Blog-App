const configs = require("./configs");
require("dotenv").config();


module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT || 3306,
        poolSize: process.env.DB_POOL_SIZE || 30,
      },
      test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT || 3306,
        poolSize: process.env.DB_POOL_SIZE || 30,
      },
      production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT || 3306,
        poolSize: process.env.DB_POOL_SIZE || 30,
      }
};
