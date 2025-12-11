// import required modules
const customerOrderServices = require('../../services/customerServices/customerOrderService');

exports.placeOrder = async(req,res) =>{
    try {
        // get the customerId from token
        const customerId = req.user.id;

        // get other data from req.data;
        const data = req.body;

        //pass the data to the service layer
        const newOrder = await customerOrderServices.placeOrder(customerId,data);

        // if request handled successfully
        res.status(201).json({message:"Order placed successfully!",newOrder});
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message ||
            "Something went wrong!"
        })
    }
};


exports.getAllOrders = async(req,res)=>{
    try {
        // get customerId from the token
        const customerId = req.user.id;

        // pass it to the service layer
        const allOrders = await customerOrderServices.getOrder(customerId);

        // if request handled successfully
        res.status(200).json(allOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"});
    }
};

exports.specificOrder = async(req,res)=>{
    try {
        // get the orderId from the params
        const orderId = req.params.orderId;

        // pass it to the service layer
        const order = await customerOrderServices.getAnOrder(orderId);

        // if request handled successfully 
        res.status(200).json(order);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"});
    }
};


exports.orderStatus = async (req,res)=>{
    try {
        // get orderId from the params
        const orderId = req.params.orderId;

        // pass it to the service layer
        const orderStatus = await customerOrderServices.getOrderStatus(orderId);

        // if request handled successfully
        res.status(200).json({orderStatus});
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(404).json({message:"Something went wrong!!"})
    }
};