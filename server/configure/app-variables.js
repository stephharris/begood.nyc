'use strict';

const express = require('express');
const path = require('path');
const rootPath = path.join(__dirname, '../../');
const indexPath = path.join(rootPath, './views/index.html');
const publicPath = path.join(rootPath, './public');
const browserPath = path.join(rootPath, './views');
const npmPath = path.join(rootPath, './node_modules');
const envPath = path.join(rootPath, './server/env');

module.exports = function (app) {
  app.set('envPath', envPath);
  app.set('projectRoot', rootPath);
  app.set('npmPath', npmPath);
  app.set('indexHTMLPath', indexPath);
  app.set('publicPath', publicPath);
  app.set('browserPath', browserPath);
  app.use(express.static(npmPath));
  app.use(express.static(publicPath));
  app.use(express.static(browserPath));
}
