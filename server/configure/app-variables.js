'use strict';

const express = require('express');
const path = require('path');
const rootPath = path.join(__dirname, '../../');
const indexPath = path.join(rootPath, './views/index.html');
const publicPath = path.join(rootPath, './public');
const browserPath = path.join(rootPath, './views');

module.exports = function (app) {
  app.set('projectRoot', rootPath);
  app.set('indexHTMLPath', indexPath);
  app.set('publicPath', publicPath);
  app.set('browserPath', browserPath);
  app.use(express.static(publicPath));
  app.use(express.static(browserPath));
}
