const config = {
  port: process.env.PORT || 8080,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiEndpoint: process.env.API_ENDPOINT,
  jwtSecret: process.env.SECRET
}

module.exports = config
