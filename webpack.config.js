'use strict';

// this file runs when process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './views/react/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'eval',
  // only runs if we're in production
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [ // this loads and bundles all our front-end styles/js files
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'views', 'styles')
      }
    ]
  }
};

