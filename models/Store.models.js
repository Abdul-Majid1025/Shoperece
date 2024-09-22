const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../db/db.js");
const Users = require("./User.models.js");
const Products = require("./Products.models");

module.exports = (sequelize, DataTypes) => {
    const Stores = sequelize.define("Stores", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        storeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apartment: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
        },
        isRegistered: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        storeImage: {
            type: DataTypes.STRING,
        },
    });

    // Users.hasMany(Stores);
    // Users.hasMany(Stores, {foreignKey: 'countryCode', sourceKey: 'isoCode'});

    // Stores.belongsTo(Users, { foreignKey: "userId" });

    Users.associate = function(models) {
        Users.hasMany(models.Stores);
    };

    Stores.associate = function(models) {
        Stores.hasMany(models.Products);
    };

    return Stores;
};