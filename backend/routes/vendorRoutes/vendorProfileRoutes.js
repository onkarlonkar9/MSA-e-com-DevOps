// import required files
const express = require("express");
const vendorProfileController = require('../../controllers/vendorControllers/vendorProfileController');
const authenticate = require("../../middleware/authenticate");

// initiate router instance
const router = express.Router();

// get profile details
router.get('/account',authenticate,vendorProfileController.profileDetails);

// update vendor profile details
router.put('/account',authenticate,vendorProfileController.updateAccount);

// delete a vendor account
router.delete('/account',authenticate,vendorProfileController.deleteVendor);

// export router
module.exports = router;
