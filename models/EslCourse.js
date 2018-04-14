'use strict';

module.exports = (sequelize, DataTypes) => {
    var EslCourse = sequelize.define('EslCourse', {
        currentPeriod: DataTypes.DATE,
        nextRound: DataTypes.DATE ,
        cost: DataTypes.INTEGER
    });

    return EslCourse
}