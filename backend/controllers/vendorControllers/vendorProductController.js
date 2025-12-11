// import required modules 
const vendorProductServices = require('../../services/vendorServices/vendorProductService');

// get all  products(self-listed)
exports.getAllProducts = async(req,res)=>{
    try {
        // get vendorId from token
        const vendorId = req.user.id;
 
        // passing data to service layer
        const productsList = await vendorProductServices.AllProducts(vendorId);
        
        // displaying all products
        res.status(200).json(productsList);
    } catch (error) {
        // if any error occurs
        res
          .status(500)
          .json({ message: error.message || "Something went wrong" });
    }
};

// add a new product
exports.newProduct = async(req,res) =>{
    try {
      // get vendorId from token
      const vendorId = req.user.id;

      // Parse price to ensure proper format
      const price = parseFloat(req.body.price).toFixed(2);

      // passing vendorId explicitly to the services
      const data = {
        ...req.body,
        vendorId,
        file: req.file,
      };

      // pass the data to the service layer
      const product = await vendorProductServices.createProduct(data);

      // if request successfully handled
      res.status(201).json({ message: "Product created", product });
    } catch (error) {
        // if any error occurs
        res
          .status(500)
          .json({ message: error.message || "Something went wrong" });
    }
};

// update a product
exports.updateProduct = async (req,res)=>{
    try {
      // get productId from params
      const productId = req.params.productId;

      // pass data to the service layer
      const updatedProduct = await vendorProductServices.updateProduct(
        productId,
        req.body
      );

      // if request successfully handled
      res.status(200).json({ message: "Product updated!", updatedProduct });
    } catch (error) {
        // if any error occurs
        res
          .status(error.statusCode || 500)
          .json({ message: error.message || "Something went wrong" });
    }
};

// delete a product
exports.deleteProduct = async(req,res)=>{
    try {
      // get productId from the params
      const productId = req.params.productId;

      // send request to service layer
      const product = await vendorProductServices.deleteProduct(productId);

      // if request successfully handled
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        // if any error occurs
        res
          .status(error.statusCode || 500)
          .json({ message: error.message || "Something went wrong" });
    }
};