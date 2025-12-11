// import required modules
const customerCartServices = require('../../services/customerServices/customerCartService');

exports.addAProduct = async(req,res)=>{
    try {
        // get the customer Id from the token
        const customerId = req.user.id;

        // get the productId from the params
        const productId = req.params.productId;

        // pass it to the service layer
        const addedProduct = await customerCartServices.addToCart(customerId,productId);

        // if request handled successfully
        res.status(200).json({message:"Product added to the cart"});
    } catch (error) {
        // if any error occurs 
        console.error(error);
        res.status(500).json({message:error.message ||"Something went wrong!"
        })
    }
};

exports.getCart = async(req,res)=>{
    try {
        // get the customerId from the token
        const customerId = req.user.id;

        // pass it to the service layer
        const cartInfo = await customerCartServices.getCustomerCart(customerId);

        // if request handled successfully
        res.status(200).json(cartInfo);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"});
    }
};

exports.removeAProduct = async(req,res)=>{
    try {
        // get customerId from the token
        const customerId = req.user.id;

        // get productId from the params
        const productId = req.params.productId;

        // pass it to the service layer
        const productToRemove = await customerCartServices.removeFromCart(customerId,productId);

        //if request handled successfully
        res.status(200).json({message:"Product removed from the cart"})
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"});
    }
};