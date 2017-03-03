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
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'tests/**/*.test.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: ['progress'],
    webpack: webpackConfig
  });
};
