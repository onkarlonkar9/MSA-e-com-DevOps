"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Addresses.belongsTo(models.Customers, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });
    }
  }
  Addresses.init(
    {
      addressId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email:DataTypes.STRING,
      contactNumber: DataTypes.STRING,
      addressLine: DataTypes.STRING,
      landMark: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      state: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      addressType: DataTypes.ENUM("Shipping", "Billing"),
      isDefault:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
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
      modelName: "Addresses",
      tableName: "Addresses",
      timestamps: true,
    }
  );
  return Addresses;
};
