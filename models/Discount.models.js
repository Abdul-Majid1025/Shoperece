const { Sequelize, DataTypes } = require("sequelize");
const Products = require("./Products.models.js");

module.exports = (sequelize, DataTypes) => {
    const Discounts = sequelize.define("Discounts", {
        discountId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },

        discountCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        discountAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    });

    Products.associate = function(models) {
        Products.hasMany(
            models.Discounts, { foreignKey: "productId" }, { onDelete: "cascade", hooks: true }
        );
    };

    return Discounts;
};