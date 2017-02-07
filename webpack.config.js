'use strict';

// this file runs when process.env.NODE_ENV !== "production"
// only real differences from webpack.prod.config.js are plugins & devtool
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './views/react/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devServer: {
    inline: true,
    port: 3001
  },
  context: __dirname,
  devtool: 'source-map',
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [ // this loads and bundles all our front-end styles/js files
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
         query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'views', 'styles')
      }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};

