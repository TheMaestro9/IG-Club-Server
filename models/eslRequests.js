'use strict';

module.exports = (sequelize, DataTypes) => {
    var EslRequests = sequelize.define('EslRequests', {
        communicationTime: DataTypes.STRING,
        courseArea:DataTypes.STRING,
        courseDate: DataTypes.DATE 
    });

    EslRequests.associate = function(models) {
        models.EslRequests.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }
    return EslRequests
}