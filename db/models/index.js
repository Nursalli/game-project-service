const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const envConfig = require('../config')[process.env.NODE_ENV || 'development'];
const { url: connectionString, ...config } = envConfig;

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(connectionString, config);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
