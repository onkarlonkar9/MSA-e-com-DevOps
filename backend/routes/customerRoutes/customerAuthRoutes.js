// import required modules
const express = require("express");
const customerAuthController = require("../../controllers/customerControllers/customerAuthController");
const authenticate = require('../../middleware/authenticate');

// initiate a router instance
const router = express.Router();

// sign up route
router.post("/signup", customerAuthController.signUp);

// login route
router.post("/login", customerAuthController.login);

// logout route
router.post("/logout", customerAuthController.logout);

// check login status
router.get('/me',authenticate,customerAuthController.checkIsLoggedIn);

// export router
module.exports = router;
