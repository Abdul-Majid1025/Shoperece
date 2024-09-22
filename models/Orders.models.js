const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../db/db.js");

const OrderItems = require("./OrderItems.models.js");

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      primaryKey: true,
    },

    transactionId: {
      type: DataTypes.STRING,
    },
    transactionMethod: {
      type: DataTypes.STRING,
    },
    orderStatus: {
      type: DataTypes.STRING,
      required: true,
      defaultValue: "pending",
    },
    orderPlacedDate: {
      type: DataTypes.DATE,
    },

    orderDeliveredDate: {
      type: DataTypes.DATE,
    },
    deliveryTime: {
      type: DataTypes.STRING,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
    },
  });

  // Users.hasMany(Stores, { as: "stores", foreignKey: "userId" });
  Orders.associate = function (models) {
    Orders.belongsTo(models.Stores, { onDelete: "cascade", hooks: true });
    // Orders.hasMany(
    //   models.OrderItems,
    //   { foreignKey: "orderId" },
    //   { onDelete: "cascade", hooks: true }
    // );
  };
  // OrderItems.associate = function (models) {
  //   OrderItems.belongsTo(
  //     models.Orders,
  //     { foreignKey: "orderId" },
  //     { onDelete: "cascade", hooks: true }
  //   );
  // };

  // OrderItems.associate = function (models) {
  //   OrderItems.belongsTo(
  //     models.Orders,
  //     // { foreignKey: "orderId" },
  //     {
  //       foreignKey: {
  //         primaryKey: true,
  //       },
  //     },
  //     { onDelete: "cascade", hooks: true }
  //   );
  // };

  return Orders;
};
