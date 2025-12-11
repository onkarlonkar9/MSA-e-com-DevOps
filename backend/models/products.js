"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Vendors, {
        foreignKey: "vendorId",
        onDelete: "CASCADE",
      });
      Products.hasMany(models.ProductImages, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
      Products.hasMany(models.Cart, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        as: "cartEntries"
      });
      Products.hasMany(models.OrderItems,{
        foreignKey:"productId"
      })
    }
  }
  Products.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vendorId: DataTypes.INTEGER,
      brandName:DataTypes.STRING,
      productName: DataTypes.STRING,
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      specification: DataTypes.TEXT,
      soldOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "Products",
      tableName: "Products",
      timestamps: true,
    }
  );
  return Products;
};
