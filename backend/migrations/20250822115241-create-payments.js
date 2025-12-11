'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      paymentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId:{
        type:Sequelize.INTEGER,
        references:{
          model:"Orders",
          key:"orderId"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      customerId:{
        type:Sequelize.INTEGER,
        references:{
          model:"Customers",
          key:"customerId"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },

      razorpayPaymentId:{
        type:Sequelize.STRING,
      },
      razorpayOrderId:{
        type:Sequelize.STRING
      },
      razorpaySignature:{
        type:Sequelize.STRING
      },
      amountPaid: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue:"INR"
      },
      method: {
        type: Sequelize.STRING
      },
      status:{
        type:Sequelize.ENUM("created","authorized","captured","failed","refunded")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};