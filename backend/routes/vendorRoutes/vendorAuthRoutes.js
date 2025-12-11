// import required files
const express = require('express');
const vendorAuthController = require('../../controllers/vendorControllers/vendorAuthController');
// initiate router instance 
const router = express.Router();
const {upload} = require('../../middleware/multer');

// signup route
router.post('/signup',upload.single("brandLogo"),vendorAuthController.signup);

// login route
router.post('/login',vendorAuthController.login);

router.post('/logout', vendorAuthController.logout);


// export router 
module.exports = router;