'use strict';

module.exports = (sequelize, DataTypes) => {
    var Books = sequelize.define('Books', {
        bookTitle: DataTypes.STRING, 
        imgUrl:DataTypes.STRING, 
        ISBN: DataTypes.STRING,
        category: DataTypes.STRING ,
        paymentMethod:DataTypes.STRING, 
        bookCondition:DataTypes.STRING, 
        price: DataTypes.INTEGER,
        byAdmin: {
            type:DataTypes.BOOLEAN , 
            defaultValue: false 
        }
    });

    Books.associate = function(models) {    
        models.Books.belongsToMany(models.User, {
            through:"BookRequests"
        });
    }

    Books.associate = function (models) {
        models.Books.belongsTo(models.User);
      }
    
    
    return Books 
    

}