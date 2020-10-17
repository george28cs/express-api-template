const config = {
  port: process.env.PORT || 4000,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  autJwtSecret: process.env.AUTH_JWT_SECRET,
}

module.exports = config