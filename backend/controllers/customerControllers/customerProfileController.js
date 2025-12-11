// import required modules
const customerProfileServices = require('../../services/customerServices/customerProfileService');

// get customer details
exports.getProfile = async(req,res)=>{
    try {
      // get vendorId from token
      const  customerId  = req.user.id;

      // pass the details to service layer
      const customerData = await customerProfileServices.getProfileDetails(customerId);

      // if request handled successfully
      res.status(200).json(customerData);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!!"})
    }
};

// update the customer details
exports.updateProfile = async (req,res) =>{
  try {
    // get customerId from token
      const customerId  = req.user.id;

    // pass the details to service layer
    const customerData = await customerProfileServices.updateProfile(customerId,req.body);

    // if request handled successfully
    res.status(200).json(customerData);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode|| 500).json({message:error.message || "Something went wrong!!"})
  }
};

// delete the customer
exports.deleteCustomer = async(req,res)=>{
  try {
    // get id from token
    const customerId = req.user.id;

    // pass the id to the service layer 
    const customer = await customerProfileServices.deleteCustomer(customerId);

    // if request handled successfully
    res.status(200).json("Account deleted successfully!");

  } catch (error) {
    // if any error occurs
    console.error(error);
    res.status(500).json({message:error.message || "Something went wrong"});
  }
};