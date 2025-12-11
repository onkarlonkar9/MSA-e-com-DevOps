"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customers.hasMany(models.Addresses, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });
      Customers.hasMany(models.Orders, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });
      Customers.hasMany(models.Payments,{
        foreignKey:'customerId',
        onDelete:"CASCADE"
      });
      Customers.hasMany(models.SubOrders,{
        foreignKey:'customerId',
        onDelete:"CASCADE"
      });
      Customers.hasMany(models.OrderItems,{
        foreignKey:'customerId',
        onDelete:'CASCADE'
      });
    }
  }
  Customers.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type:DataTypes.STRING,
        unique:true
      },
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      contactNumber: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Customers",
      tableName: "Customers",
      timestamps: true,
    }
  );
  return Customers;
};
