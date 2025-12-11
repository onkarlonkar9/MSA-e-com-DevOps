// import required module
const customerProductService = require('../../services/customerServices/customerProductService');


exports.getAllProducts = async(req,res)=>{
    try {
        // pass the request to the service layer
        const allProducts = await customerProductService.allProducts();

        // if request handled successfully
        res.status(200).json(allProducts);
    } catch (error) {
        // if any error occurs 
        console.error(error);
        res.status(500).json({message:error.message ||"Something went wrong"})
    }
}

exports.getAProduct = async(req,res)=>{
    try {
        // get the productId from the params
        const productId = req.params.productId;

        // pass it to the service layer
        const product = await customerProductService.getSpecificProduct(productId);

        // if request handled successfully
        res.status(200).json(product);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"})
    }
};