var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    library: 'WaterRedux',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: [/src/, /tests/]
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
  },

  externals: {
    redux: 'redux'
  }
}
