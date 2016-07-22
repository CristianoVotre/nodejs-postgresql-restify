'use strict';

const chalk = require('chalk');

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/database.json')[env];
var database  = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  console.log(config);
  //var sequelize = new Sequelize('postgres://postgres:@localhost:5432/database_development');
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  /*var sequelize = new Sequelize("database_development",
    "postgres",
    "", {
        host: "localhost",
        port: "5432",
        dialect: "postgres",
        logging: false,
        define: {
            schema: "public"
        }
    });
   */
}
/*
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {

    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
*/
database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
