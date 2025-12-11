// import required modules
const express = require('express');
const customerCartController = require('../../controllers/customerControllers/customerCartController');
const authenticate  = require('../../middleware/authenticate');

// initiate a router instance
const router = express.Router();

// add product to the cart
router.post('/add/:productId',authenticate,customerCartController.addAProduct);

// get all products from the cart
router.get('/cart',authenticate,customerCartController.getCart);

// remove product from the cart
router.delete('/remove/:productId',authenticate,customerCartController.removeAProduct);

// export router
module.exports = router;