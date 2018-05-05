'use strict';

module.exports = (sequelize, DataTypes) => {
    var BookRequests = sequelize.define('BookRequests', { 
        UserId: DataTypes.INTEGER,
        BookId: DataTypes.INTEGER
    });
    return BookRequests
}