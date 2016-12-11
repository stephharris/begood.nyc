'use strict';

//const debug = process.env.NODE_ENV !== "production";
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
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
        // query: {
        //   presets: ['react', 'es2015'],
        //   plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        // }
      },
      {
        test: /\.css?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'views', 'styles')
      }
    ]
  }
};

