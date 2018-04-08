module.exports = (sequelize, DataTypes) => {
    var Child = sequelize.define('Child', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: DataTypes.INTEGER
    });

    Child.associate = function(models) {
        models.Child.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Child;
};
