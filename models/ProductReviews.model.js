const { Sequelize, DataTypes } = require("sequelize");
const Products = require("./Products.models.js");

module.exports = (sequelize, DataTypes) => {
  const ProductReviews = sequelize.define("ProductReviews", {
    reviewId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },

    review: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.INTEGER,
    },
  });
  Products.associate = function (models) {
    Products.hasMany(
      models.ProductReviews,
      { foreignKey: "productId" },
      { onDelete: "cascade", hooks: true }
    );
  };
  return ProductReviews;
};
