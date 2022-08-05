require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DB_CONNECTION_STRING,
<<<<<<< HEAD
    dialect: 'postgres',
=======
    dialect: "postgres",
>>>>>>> a228738 (modify config and env.sample for postgres environment)
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
