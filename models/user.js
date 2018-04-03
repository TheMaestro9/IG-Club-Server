'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // mobile: DataTypes.INTEGER,
    // grade: DataTypes.BOOLEAN,
  });

  return User;
};