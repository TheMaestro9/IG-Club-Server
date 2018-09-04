'use strict';

module.exports = (sequelize, DataTypes) => {
    var Book = sequelize.define('Book', {
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

    Book.associate = function(models) {    
        Book.belongsToMany(models.User, {
            through:"BookRequests"
        });
    }

    return Book 
    

}