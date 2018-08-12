module.exports = {
  development: {
    database: {
      username: 'root',
      password: 'somepassword',
      database: 'somedb',
      host: 'localhost',
      dialect: 'mysql',
    },
    jwtSecret: 'SOME_JWT_SECRET',
  },
  production: {
    database: {
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      host: process.env.MYSQL_HOST,
      dialect: 'mysql',
    },
    jwtSecret: process.env.JWT_SECRET,
  },
};
