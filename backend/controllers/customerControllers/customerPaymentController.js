// import required modules
const customerPaymentService = require('../../services/customerServices/customerPaymentService');

exports.createOrder = async(req,res)=>{
    try {
        // get customerId from cookies
        const customerId = req.user.id;

        // pass it to the service layer
        const order =await customerPaymentService.orderToCreated(customerId);

        // if request handled successfully
        res.status(200).json(order);
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
};

exports.verifyPayment = async (req,res)=>{
    try {

        // pass the data to the service layer
        const isVerified = await customerPaymentService.verify(req);
       

        // if req handled successfully
        res.status(200).json(isVerified);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Something went wrong while processing payment!!",
        });
    }
};

exports.PaymentDetailsThroughWebhook =async(req,res)=>{
    try {
        const PaymentDetails = await customerPaymentService.paymentStatus(req);

        res.status(200).json(PaymentDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong!!"})
    }
};