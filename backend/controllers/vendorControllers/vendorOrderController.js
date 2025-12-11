// import required modules
const vendorService = require('../../services/vendorServices/vendorOrderService');


exports.getOrders = async (req,res)=>{
    try {
        // get vendorId from token;

        const vendorId = req.user.id;

        // pass it to the service layer
        const orders = await vendorService.getVendorOrders(vendorId);

        // if request handled successfully
        res.status(200).json(orders);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:"Something went wrong!!"
        })
    }
}