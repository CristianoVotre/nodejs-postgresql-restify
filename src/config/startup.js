'use strict';

/**
 * Libraries.
 */
const _ = require('lodash');
const pkg = require('../../package.json');
const postgresql = require('./postgresql');
const chalk = require('chalk');
/**
 * Methods.
 */

var init = () => {
  // Load settings from the selected environment
  let env = process.env.NODE_ENV || 'development';
  
  let serverConfig = require('./server');
  let environmentConfig = require('./' + env);
  let config = _.merge(serverConfig, environmentConfig);
  config.mode = env;
   console.log(chalk.white('INIT'));
  // Load metadata from the package.json;
  config.pkg = pkg;
  return config;
};

module.exports = init();
module.exports.database = postgresql;