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
    mobile: DataTypes.STRING,
    grade: DataTypes.STRING,
    school: DataTypes.STRING,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    admin:{
      type: DataTypes.BOOLEAN , 
      defaultValue: false 
    } 
  });

  User.associate = function (models) {
    models.User.hasMany(models.Child);
  }

  User.associate = function (models) {
    models.User.belongsToMany(models.Courses, {
      through: "CourseRequests"
    });
  }
  User.associate = function (models) {
    models.User.belongsToMany(models.Book, {
      through: "BookRequests"
    });
  }

  User.associate = function(models) {
    models.User.belongsToMany(models.Activity, { through: 'Interests'})
  }
  
  return User;
};
