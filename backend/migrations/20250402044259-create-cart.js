"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Carts", {
      cartId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "customerId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "productId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantity:{
        type:Sequelize.INTEGER,
        defaultValue:1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Carts");
  },
};
