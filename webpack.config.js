'use strict';

const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

module.exports = {
  entry: './views/react/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: debug ? 'source-map' : null,
  // only runs if we're in production
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.UglifyJSPlugin({ mangle: false, sourcemap: false })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      }
    ]
  }
};

