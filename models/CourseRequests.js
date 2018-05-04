'use strict';

module.exports = (sequelize, DataTypes) => {
    var CourseRequests = sequelize.define('CourseRequests', {
        communicationTime: DataTypes.STRING,
        courseArea:DataTypes.STRING,
        courseDate: DataTypes.DATE, 
        UserId: DataTypes.INTEGER,
        CourseId: DataTypes.INTEGER
    });
    return CourseRequests
}