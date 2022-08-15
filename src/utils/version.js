require('dotenv').config();
const version = require('../../version');

const getVersion = () => {
  return version + (process.env.NODE_ENV === 'production' ? '' : '-beta');
};

module.exports = getVersion;
