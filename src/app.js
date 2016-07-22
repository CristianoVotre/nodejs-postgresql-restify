'use strict';

/**
 * Libraries.
 */
const chalk = require('chalk');
const restify = require('restify');
const bunyan = require('bunyan');
const envCfg = require('./config/startup');

/**
 * Routes.
 */
//const examplesRoutes = require('./main/routes/examples');

module.exports.start = function start(callback) {
    var server = restify.createServer();
    server.use(restify.CORS());
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.gzipResponse());
    server.use(restify.bodyParser({ mapParams: false }));
    server.use(restify.requestLogger());
    
    server.on('MethodNotAllowed', function(req, res) {
      if (req.method.toUpperCase() === 'OPTIONS') {
        //res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        //res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        restify.CORS.ALLOW_HEADERS.push('Authorization');
        res.header('Access-Control-Allow-Headers', restify.CORS.ALLOW_HEADERS.join(', '));
        //res.header('Access-Control-Max-Age', 0);
        //res.header('Content-type', 'text/plain charset=UTF-8');
        //res.header('Content-length', 0);
      
        res.send(204);
        
      } else {
        res.send(new restify.MethodNotAllowedError());
      }
    });
    
    //examplesRoutes(server);
    
    server.on('uncaughtException', function(req, res, route, err) {
      let auditer = restify.auditLogger({ 
        log: bunyan.createLogger({
          name: 'nodejs-postgresql-restify',
          streams: [
            {
              stream: process.stdout
            },
            {
              path: '/var/tmp/nodejs-postgresql-restify.error.log'
            }
          ]
        }),
        body: true
      });

      auditer(req, res, route, err);
      return res.send(500, 'Unexpected error occurred'); // TODO Return friendly message...
    });
    
    server.listen(envCfg.port, function() {
      console.log(chalk.white('Environment\t\t[ ' + chalk.green(envCfg.mode) + ' ]'));
      console.log(chalk.white('Database\t\t[ ' + chalk.green(envCfg.database.uri) + ' ]'));
      console.log(chalk.white('Server port\t\t[ ' + chalk.green(envCfg.port) + ' ]'));
      console.log(chalk.white('Application version\t[ ' + chalk.green(envCfg.pkg.version) + ' ]'));
      console.log(chalk.bold.green('Started application server.'));

      if (callback) callback(server);
    });
};