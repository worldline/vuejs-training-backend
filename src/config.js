const prompt = require("prompt-sync")()

const OMDBAPI_KEY = prompt(`Enter an OMDB API Key:`) || null;
if (OMDBAPI_KEY == null) {
  console.log(`No API key, mocked responses will be used instead`)
}
const MAX_OMDBAPI_CALLS = 4

module.exports = {
  port: process.env.PORT || 3030,
  db: {
    default: {
      database: process.env.DB_NAME || 'myapp',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      options: {
        dialect: process.env.DB_DIALECT || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialectOptions: !process.env.DB_DIALECT_OPTIONS ? {} : {
          ssl: {
            require: process.env.DB_DIALECT_OPTIONS_SSL_REQUIRE || true,
            rejectUnauthorized: process.env.DB_DIALECT_OPTIONS_SSL_REJECT_UNAUTHORIZED || false
          }
        }
      }
    },
    local: {
      options: {
        dialect: 'sqlite',
      }
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  omdbapi: {
    secretKey: OMDBAPI_KEY,
    maxCalls: MAX_OMDBAPI_CALLS
  }
}
