"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      orderId: {
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
      shippingName:{type:Sequelize.STRING},
      shippingPhone:{type:Sequelize.STRING},
      shippingEmail:{type:Sequelize.STRING},
      shippingStreet:{type:Sequelize.STRING},
      shippingCity:{type:Sequelize.STRING},
      shippingDistrict:{type:Sequelize.STRING},
      shippingState:{type:Sequelize.STRING},
      shippingPincode:{type:Sequelize.STRING},
      totalAmount: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          "PENDING_PAYMENT",
          "PAID",
          "FAILED",
          "CANCELLED",
          "SHIPPED",
          "DELIVERED"
        ),
        defaultValue: "PENDING_PAYMENT",
      },
      razorpayOrderId:Sequelize.STRING,
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
    await queryInterface.dropTable("Orders");
  },
};
