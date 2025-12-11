// import required modules
const { Op } = require("sequelize");
const {
  Orders,
  Products,
  Addresses,
  OrderItems,
  Vendors,
} = require("../../models");

// get all order for the customer
exports.getOrder = async (customerId) => {
  // got the customerId from controller layer

  // filter out order using customerId and status = 'confirmed'
  const ordersData = await OrderItems.findAll({
    where: { customerId, status: { [Op.in]: ["CONFIRMED", "PAYMENT_PROCESSING"]} },

    include: [
      // join vendor table using vendorId
      {
        model: Vendors,
      },
      // join orders table  using orderId
      {
        model: Orders,
      },
    ],
    // get data as newest first
    order: [["updatedAt", "DESC"]],
  });
  // return the data
  return ordersData;
};

exports.getAnOrder = async (orderId) => {
  // got the  orderId from the controller layer

  // find the order by orderId in db
  const order = await Orders.findOne({
    where: { orderId },
    include: [
      {
        model: Products,
        attributes: ["productName", "specification"],
      },
      {
        model: Addresses,
        attributes: ["addressLine", "city", "district", "postalCode"],
      },
    ],
  });

  // return to the controller layers
  return order;
};

exports.getOrderStatus = async (orderId) => {
  const order = await Orders.findOne({ where: { orderId } });

  return order?.status;
};
