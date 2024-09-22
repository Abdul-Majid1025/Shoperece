const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../db/db.js");

module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define("Customers", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,

      alloWNull: false,
      validate: {
        isEmail: true,
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      required: true,
      defaultValue: "customer",
    },

    password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  });

  // Users.hasMany(Stores, { as: "stores", foreignKey: "userId" });
  // Customers.associate = function(models) {
  //     Customers.belongsTo(models.Stores, { onDelete: "cascade", hooks: true });
  // };

  Customers.associate = function (models) {
    Customers.hasMany(
      models.Orders,
      { foreignKey: "customerId" },
      { onDelete: "cascade", hooks: true }
    );

    Customers.hasMany(
      models.ProductReviews,
      { foreignKey: "customerId" },
      { onDelete: "cascade", hooks: true }
    );
  };
  return Customers;
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
