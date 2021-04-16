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
        dialectOptions: {
          ssl: process.env.DB_DIALECT_OPTIONS_SSL || true
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
    secretKey: process.env.OMDBAPI_KEY,
    maxCalls: process.env.MAX_OMDBAPI_CALLS || 4
  }
}
