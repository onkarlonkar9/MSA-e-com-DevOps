// import required module
const { OrderItems,Orders,Payments} = require('../../models');

exports.getVendorOrders = async (vendorId) => {
  const orders = await OrderItems.findAll({
    where: { vendorId, status: "CONFIRMED" },
    include:[
        {
            model:Orders,
            include:[{
              model:Payments
            }]
        
        
          }
    ],
    order: [['updatedAt',"DESC"]]
  });

  return orders;
};
