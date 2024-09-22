const { Sequelize, DataTypes } = require("sequelize");

const Orders = require("./Orders.models.js");

module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define("OrderItems", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
    },
  });

  // OrderItems.associate = function (models) {
  //   OrderItems.hasMany(
  //     models.Orders,
  //     // { foreignKey: "orderId" },
  //     {
  //       foreignKey: {
  //         primaryKey: true,
  //       },
  //     },
  //     { onDelete: "cascade", hooks: true }
  //   );
  //   // OrderItems.belongsTo(
  //   //   models.Orders,
  //   //   { foreignKey: "orderId" },
  //   //   { onDelete: "cascade", hooks: true }
  //   // );
  // };

  return OrderItems;
};
