const customerAddressService = require('../../services/customerServices/customerAddressService');


exports.addNewAddress = async(req,res)=>{
    try {
        // get the customerid from the token
        const customerId = req.user.id;

        // pass the data to the service layer
        
        const newAddress = await customerAddressService.addAddress(customerId,req); 

        // if request handled successfully
        res.status(201).json({message:"Address added successfully!",newAddress})
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message ||"Something went wrong!"});
    };
};

// get all address for a customer
exports.getAllAddresses = async(req,res)=>{
    try {
        //get the customerId from the token
        const customerId = req.user.id;

        // pass it to the service layer
        const allAddresses = await customerAddressService.getAddress(customerId);
        
        // if request handled successfully
        res.status(200).json(allAddresses);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"})
    }
};

exports.updateAnAddress = async(req,res)=>{
    try {
        // get the customerId from the token
        const customerId = req.user.id;

        // get the addressId from params
        const addressId = req.params.addressId;

        // get the data from request
        const data = req.body;
        
        // send it to the service layer
        const updatedAddress = await customerAddressService.updateAddress(
            customerId,
            addressId,
            data
        )
        
        // if request handled successfully
        res.status(200).json({message:"Address updated successfully!",updatedAddress})
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message||"Something went wrong!"})
    }
};

exports.deleteAnAddress =async (req,res)=>{
    try {
        // get the customerId from token
        const customerId  = req.user.id;

        // get the addressId from params
        const addressId = req.params.addressId;

        // pass it to service layer
        const addressToDelete = await customerAddressService.deleteAddress(customerId,addressId);

        // if request handled successfully

        res.status(200).json({message:"Address deleted successfully"});
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message ||"Something went wrong"});
        }
};

exports.setDefaultAddress = async(req,res)=>{
    try {
      // get the customerId from token
      const customerId = req.user.id;

      // get the addressId from params
      const addressId = req.params.addressId;

      // pass it to the service layer
      const setDefault = await customerAddressService.setDefault(
        customerId,
        addressId
      );

      // if request handled successfully
      res
        .status(200)
        .json({ message: "Default address changed successfully!!" });
    } catch (error) {
        // if any error occurs
        console.error(error);
        res
          .status(500)
          .json({ message: error.message || "Something went wrong" });
    }
};

exports.getDefaultAddress = async(req,res)=>{
    try {
      // get the customerId from token
      const customerId = req.user.id;

      // pass it to the service layer
      const defaultAddress = await customerAddressService.getDefaultAddress(
        customerId
      );

      // if request handled successfully
      res.status(200).json(defaultAddress);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"});
    }
}