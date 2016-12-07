'use strict';

const path = require('path');
const rootPath = path.join(__dirname, '../../');
const indexPath = path.join(rootPath, './views/index.html');
// const env = require(path.join(rootPath, './server/env'));

module.exports = function (app) {
  // app.set('env', env);
  app.set('projectRoot', rootPath);
  app.set('indexHTMLPath', indexPath);
}
