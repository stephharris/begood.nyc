const path = require('path');
const devConfigPath = require('./development.js');
const productionConfigPath = require('./production.js');

if (process.env.NODE_ENV === 'production') {
  module.exports = productionConfigPath;
} else {
  module.exports = devConfigPath;
}
