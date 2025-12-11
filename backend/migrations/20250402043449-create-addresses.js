"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      addressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "customerId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type:Sequelize.STRING,
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressLine: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landMark: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postalCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      country: {
        defaultValue: "INDIA",
        type: Sequelize.STRING,
      },
      addressType: {
        type: Sequelize.ENUM("Shipping", "Billing"),
        defaultValue: "Shipping",
      },
      isDefault:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
