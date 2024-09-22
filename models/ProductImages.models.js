const { Sequelize, DataTypes } = require("sequelize");
const Products = require("./Products.models.js");

module.exports = (sequelize, DataTypes) => {
    const ProductImages = sequelize.define("ProductImages", {
        imageId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Products.associate = function(models) {
        Products.hasMany(
            models.ProductImages, { foreignKey: "productId" }, { onDelete: "cascade", hooks: true }
        );
    };

    return ProductImages;
};