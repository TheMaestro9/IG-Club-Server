'use strict';

module.exports = (sequelize, DataTypes) => {
    var Interests = sequelize.define('Interests', { 
        UserId: DataTypes.INTEGER,
        ActivityId: DataTypes.INTEGER
    });
    return Interests
}