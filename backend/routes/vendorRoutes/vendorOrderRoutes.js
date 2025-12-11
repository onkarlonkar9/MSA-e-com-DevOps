// import required modules
const express = require('express');

const router = express.Router();
const authenticate = require("../../middleware/authenticate");
const vendorOrderController = require('../../controllers/vendorControllers/vendorOrderController');


router.get("/orders",authenticate,vendorOrderController.getOrders);

module.exports = router;