'use strict';

module.exports = (sequelize, DataTypes) => {
    var Universities = sequelize.define('Universities', {
        description: DataTypes.STRING, 
        imgUrl: DataTypes.STRING, 
        name:DataTypes.STRING  
    });

    return Universities ; 
}
