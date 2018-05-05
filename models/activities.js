'use strict';
module.exports = (sequelize, DataTypes) => {
  var FollowedPost = sequelize.define('Activity', {
      title: {
          type: DataTypes.STRING,
          nullable: false
      },
      content: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      type: DataTypes.STRING
  });

    FollowedPost.associate = models => {
        FollowedPost.belongsToMany(models.User, { through: 'Interests'} )
    }
  return FollowedPost;
};
