require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_CONNECTION_STRING,
    dialect: 'postgres',
  },
  test: {
    url: process.env.DB_CONNECTION_STRING,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DB_CONNECTION_STRING,
    dialect: 'postgres',
  },
};
