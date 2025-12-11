// import required modules
const express = require("express");
const paymentController = require("../../controllers/customerControllers/customerPaymentController.js");
const authenticate = require("../../middleware/authenticate.js");

// initiate a router instance
const router = express.Router();

// route for creating an order
router.post("/createOrder", authenticate, paymentController.createOrder);

// route for verifying the payment
router.post("/verifyPayment", authenticate, paymentController.verifyPayment);

router.post("/payment/webhook", paymentController.PaymentDetailsThroughWebhook);

module.exports = router;
