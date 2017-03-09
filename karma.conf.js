var webpackConfig = require('./webpack.config.base');

webpackConfig.externals = {
  'cheerio': 'window',
};

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    client: {
      mocha: {
        reporter: 'html',
      }
    },
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      'tests/**/*.test.js'
    ],
    frameworks: ['mocha', 'chai'],
    plugins: [
      'karma-babel-preprocessor',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'dist/*.js': [ 'webpack', 'sourcemap' ],
      'tests/**/*.test.js': [ 'babel', 'webpack', 'sourcemap' ]
    },
    reporters: ['progress'],
    webpack: webpackConfig
  });
};
