'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

const assert = require('assert');
const util = require('util')

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
if (!appEnv.isLocal) {
  var services = appEnv.services;
  var mysql_services = services["compose-for-mysql"];
  assert(!util.isUndefined(mysql_services), "Must be bound to compose-for-mysql services");
  
  var credentials = mysql_services[0].credentials;
  var sequelize = new Sequelize(credentials.uri);

} else if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);

} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
