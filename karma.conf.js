const hasCoverage = global.process.argv.reduce(function(result, arg) {
  return arg.indexOf('coverage') !== -1 || result;
}, false);

const preLoaders = hasCoverage
  ? [
      // Process test code with Babel
      {
        test: /\.spec\.js$/,
        loader: 'babel',
        exclude: [/app\/lib/, /node_modules/],
      },

      // Process all non-test code with Isparta
      {
        test: /\.js$/,
        loader: 'isparta',
        exclude: [/app\/lib/, /node_modules/, /\.spec\.js$/],
      },
    ]
  : [{ test: /\.js$/, loader: 'babel', exclude: [/app\/lib/, /node_modules/] }];

const reporters = ['progress'];
if (hasCoverage) {
  reporters.push('coverage');
}

module.exports = function(config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files/patterns to load in the browser
    files: [{ pattern: 'spec.bundle.js', watched: false }],

    // files to exclude
    exclude: [],

    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec.bundle.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders,
        loaders: [
          { test: /\.html$/, loader: 'raw' },
          { test: /\.(scss|sass)$/, loader: 'style!css!sass' },
          { test: /\.css$/, loader: 'style!css' },
        ],
      },
    },

    webpackServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters,

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: true,
  });
};
