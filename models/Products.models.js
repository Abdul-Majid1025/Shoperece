const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    productId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(65535),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      required: true,
    },
    comparedAtPrice: {
      type: DataTypes.INTEGER,
      required: true,
    },
    costPerPrice: {
      type: DataTypes.INTEGER,
      required: true,
    },

    typeOfProduct: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: false,
    },
    weightOfProduct: {
      type: DataTypes.STRING,
    },

    quantity: {
      type: DataTypes.INTEGER,
      required: true,
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: false,
    },

    category: {
      type: DataTypes.STRING,
    },

    collection: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
  });

  // Users.hasMany(Stores, { as: "stores", foreignKey: "userId" });

  Products.associate = function (models) {
    Products.hasMany(
      models.ProductImages,
      { foreignKey: "productId" },
      { onDelete: "cascade", hooks: true }
    );
    Products.hasMany(
      models.Discounts,
      { foreignKey: "productId" },
      { onDelete: "cascade", hooks: true }
    );
    Products.hasMany(
      models.ProductVarients,
      { foreignKey: "productId" },
      { onDelete: "cascade", hooks: true }
    );
    Products.hasMany(
      models.Tags,
      { foreignKey: "productId" },
      { onDelete: "cascade", hooks: true }
    );

    Products.hasMany(
      models.OrderItems,
      { foreignKey: "productId" },
      { onDelete: "cascade", hooks: true }
    );

    Products.hasMany(
      models.ProductReviews,
      { foreignKey: "productId" },
      { onDelete: "cascade", hooks: true }
    );
  };

  return Products;
};

// module.exports = Users;

// CREATE TABLE IF NOT EXISTS "Users" ("id"
//     UUIDV4 SERIAL, "username"
//     VARCHAR(255) NOT NULL UNIQUE, "email"
//     VARCHAR(255) UNIQUE, "password"
//     VARCHAR(255), "createdAt"
//     TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt"
//     TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY("id"));

// const db = require("../db/db");
// const tableText = `
// CREATE TABLE Users (
//   id UUID PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255),PRIMARY KEY("id")
// );
// `;
// db.then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });
