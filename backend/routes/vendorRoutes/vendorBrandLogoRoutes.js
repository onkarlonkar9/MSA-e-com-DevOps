// import required modules
const express = require("express");
const vendorBrandLogoControllers = require("../../controllers/vendorControllers/vendorBrandLogoController");
const authenticate = require("../../middleware/authenticate");
const { upload } = require("../../middleware/multer");

// initiate a router instance
const router = express.Router();

// add a new brandLogo
router.post(
  "/brandLogo",
  authenticate,
  upload.single("brandLogo"),
  vendorBrandLogoControllers.addNewBrandLogo
);

router.delete(
  "/brandLogo",
  authenticate,
  vendorBrandLogoControllers.deleteLogo
);

// exports the router
module.exports = router;
