"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubOrders.belongsTo(models.Orders,{
        foreignKey:'orderId',
        onDelete:"CASCADE"
      });
      SubOrders.belongsTo(models.Vendors,{
        foreignKey:"vendorId",
        onDelete:"CASCADE"
      });
      SubOrders.belongsTo(models.Customers,{
        foreignKey:'customerId',
        onDelete:"CASCADE"
      });
      SubOrders.hasMany(models.OrderItems,{
        foreignKey:"subOrderId",
        onDelete:"CASCADE"
      })
    }
  }
  SubOrders.init(
    {
      subOrderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId:DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      vendorId: DataTypes.INTEGER,
      status: DataTypes.ENUM(
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "FAILED"
      ),
      subTotal: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "SubOrders",
      modelName: "SubOrders",
      timestamps: true,
    }
  );
  return SubOrders;
};
