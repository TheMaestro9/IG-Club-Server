'use strict';

module.exports = (sequelize, DataTypes) => {
    var Courses = sequelize.define('Courses', {
        description: DataTypes.STRING, 
        name:DataTypes.STRING, 
        currentPeriod: DataTypes.DATE,
        nextRound: DataTypes.DATE ,
        cost: DataTypes.INTEGER
    });

    Courses.associate = function(models) {
        models.Courses.belongsToMany(models.User, {
            through:"CourseRequests"
        });
    }

    return Courses
}