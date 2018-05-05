'use strict';

module.exports = (sequelize, DataTypes) => {
    var EslRequests = sequelize.define('EslRequest', {
        communicationTime: DataTypes.STRING,
        courseArea:DataTypes.STRING,
        courseDate: DataTypes.DATE 
    });

    EslRequests.associate = function(models) {
        models.EslRequest.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }
    return EslRequests
}