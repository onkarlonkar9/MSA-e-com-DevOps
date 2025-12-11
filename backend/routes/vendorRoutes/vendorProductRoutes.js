// import required files
const express = require('express');
const vendorProductController = require("../../controllers/vendorControllers/vendorProductController");
const authenticate = require("../../middleware/authenticate");
const {upload} = require('../../middleware/multer');
// initiate router instance 
const router = express.Router();

// get all products
router.get('/product',authenticate,vendorProductController.getAllProducts);

// add a product
router.post('/product',authenticate,upload.single("productImage"),vendorProductController.newProduct);

// update a product
router.put('/product/:productId',authenticate,vendorProductController.updateProduct);

// delete a product
router.delete('/product/:productId',authenticate,vendorProductController.deleteProduct);

// export router 
module.exports = router;