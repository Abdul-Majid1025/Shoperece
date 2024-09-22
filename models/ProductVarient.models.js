const { Sequelize, DataTypes } = require("sequelize");
const Products = require("./Products.models.js");

module.exports = (sequelize, DataTypes) => {
    const ProductVarients = sequelize.define("ProductVarients", {
        varientId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },

        varientSize: {
            type: DataTypes.STRING,
        },

        varientColor: {
            type: DataTypes.STRING,
        },

        varientPrice: {
            type: DataTypes.INTEGER,
        },

        varientComparePrice: {
            type: DataTypes.INTEGER,
        },

        varientCostPerItem: {
            type: DataTypes.INTEGER,
        },
    });
    Products.associate = function(models) {
        Products.hasMany(
            models.ProductVarients, { foreignKey: "productId" }, { onDelete: "cascade", hooks: true }
        );
    };
    return ProductVarients;
};