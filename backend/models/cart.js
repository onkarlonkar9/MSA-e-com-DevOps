"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Products,{
        foreignKey:"productId",
        as:"product"
      })
    }
  }
  Cart.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1
      },
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
      modelName: "Cart",
      tableName: "Carts",
      timestamps: true,
    }
  );
  return Cart;
};
