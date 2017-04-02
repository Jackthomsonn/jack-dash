var istanbul = require('browserify-istanbul')

module.exports = function (karma) {
  'use strict';
  karma.set({
    basePath: '',
    frameworks: [
      'jasmine',
      'browserify'
    ],
    files: ['src/*.spec.js'],
    reporters: [
      'progress',
      'coverage'
    ],
    preprocessors: {
      'src/*.spec.js': [
        'browserify'
      ]
    },
    browsers: [
      'Chrome'
    ],
    singleRun: false,
    autoWatch: false,
    browserify: {
      debug: true,
      transform: [
        'brfs',
        'browserify-shim',
        istanbul({
          ignore: ['**/node_modules/**']
        })
      ]
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/report',
      subdir: '.'
    },
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000
  });
};