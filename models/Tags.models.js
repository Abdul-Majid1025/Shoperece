const { Sequelize, DataTypes } = require("sequelize");
const Products = require("./Products.models.js");

module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tags", {
        tagId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Products.associate = function(models) {
        Products.hasMany(
            models.Tags, { foreignKey: "productId" }, { onDelete: "cascade", hooks: true }
        );
    };
    return Tags;
};