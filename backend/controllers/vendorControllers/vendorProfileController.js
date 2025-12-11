// import required files
const vendorProfileServices = require("../../services/vendorServices/vendorProfileService");

// get vendor details
exports.profileDetails = async (req, res) => {
  try {
    // get vendorId from token
    const vendorId = req.user.id;

    // pass the data to the service layer
    const vendorData = await vendorProfileServices.getVendorDetails(vendorId);

    // if request successfully handled
    res.status(200).json(vendorData);
  } catch (error) {
    // if any error occurs
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
};

// update profile details
exports.updateAccount = async (req, res) => {
  try {
    // get vendorId from the token
    const vendorId = req.user.id;

    // pass it to service layer
    const updatedVendor = await vendorProfileServices.updateVendorAccount(
      vendorId,
      req.body
    );

    // if request successfully handled
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedVendor });
  } catch (error) {
    // if any error occurs
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
};

// delete a vendor
exports.deleteVendor = async (req, res) => {
  try {
    // get vendorId from token
    const vendorId = req.user.id;

    // pass it to the service layer
    await vendorProfileServices.deleteAVendorAccount(vendorId);

    // if request successfully handled
    res.status(200).json({ message: "Account Deleted Successfully!!" });
  } catch (error) {
    // if any error occurs
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
};
