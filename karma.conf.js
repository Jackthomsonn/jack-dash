var istanbul = require('browserify-istanbul')

module.exports = function (karma) {
  'use strict';
  var configuration = {
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
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
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
    captureTimeout: 60000
  }

  if (process.env.TRAVIS) { configuration.browsers = ['Chrome_travis_ci']; }

  karma.set(configuration);
};