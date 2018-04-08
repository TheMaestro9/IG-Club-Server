'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isEmail: true
      }
    },
    password: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    grade: DataTypes.STRING,
    school: DataTypes.STRING
  });

  User.associate = function(models) {
    models.User.hasMany(models.Child);
  }

  return User;
};