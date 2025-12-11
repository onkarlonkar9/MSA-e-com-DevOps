"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SubOrders", {
      subOrderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Customers',
          key:'customerId'
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "orderId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      vendorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vendors",
          key: "vendorId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      subTotal: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "CONFIRMED",
          "SHIPPED",
          "DELIVERED",
          "FAILED"
        ),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SubOrders");
  },
};
