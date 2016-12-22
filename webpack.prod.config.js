'use strict';

const webpack = require('webpack');
const path = require('path');

// only runs if we're in production
module.exports = {
  entry: ['./views/react/index.js'],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  context: __dirname,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJSPlugin({ mangle: false, sourcemap: false, minimize: true, compress: { warnings: false } }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
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

