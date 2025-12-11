// import required modules
const express = require('express');
const customerProductController = require('../../controllers/customerControllers/customerProductController');

// initiate a router instance
const router = express.Router();

// get all products
router.get('/product',customerProductController.getAllProducts);

// get specific product
router.get('/product/:productId',customerProductController.getAProduct);

// export module
module.exports = router;