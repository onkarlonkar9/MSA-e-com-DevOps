"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItems", {
      orderItemsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Orders',
          key:'orderId'
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      customerId:{
        type:Sequelize.INTEGER,
        references:{
          model:"Customers",
          key:'customerId'
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      vendorId:{
        type:Sequelize.INTEGER,
        references:{
          model:"Vendors",
          key:'vendorId'
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      subOrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "SubOrders",
          key: "subOrderId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      productName: {
        type: Sequelize.STRING,
      },
      productPrice: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "CONFIRMED",
          "FAILED",
          "PAYMENT_PROCESSING"
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
    await queryInterface.dropTable("OrderItems");
  },
};
