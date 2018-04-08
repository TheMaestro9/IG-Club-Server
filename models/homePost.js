'use strict';

module.exports = (sequelize, DataTypes) => {
    var Post = sequelize.define('HomePost', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: DataTypes.TEXT,
        url: DataTypes.STRING
    });

    return Post
}