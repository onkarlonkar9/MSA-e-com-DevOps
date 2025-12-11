// import required modules
const express = require("express");
const customerAddressController = require("../../controllers/customerControllers/customerAddressController");
const authenticate = require("../../middleware/authenticate");

// initiate a router instance
const router = express.Router();

// add an address
router.post("/address", authenticate, customerAddressController.addNewAddress);

// get an address
router.get("/address", authenticate, customerAddressController.getAllAddresses);

// update an address
router.put(
    "/address/:addressId",
    authenticate,
    customerAddressController.updateAnAddress
);

// delete an address
router.delete(
    "/address/:addressId",
    authenticate,
    customerAddressController.deleteAnAddress
);
// set default address
router.post("/address/:addressId",authenticate,customerAddressController.setDefaultAddress);

// get default address
router.get("/defaultAddress",authenticate,customerAddressController.getDefaultAddress);


module.exports = router;