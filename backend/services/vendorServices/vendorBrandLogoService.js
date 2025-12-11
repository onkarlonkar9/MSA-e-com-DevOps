// import required modules
const { Vendors } = require("../../models");
const { deleteObject } = require("../../utils/deleteObject");
const { putObject } = require("../../utils/putObject");

// adding a brand logo
exports.AddBrandLogo = async (vendorId, file) => {
  // get vendorId from the controller layer

  // search for the vendor in DB using vendorId
  const vendor = await Vendors.findByPk(vendorId);

  // if vendor does not exists
  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  const fileName = `brand-logo/${Date.now()}_${file.originalname}`;
  const logoURL = await putObject(file, fileName);

  // logoUrl fails
  if (!logoURL) {
    throw new Error("Image Upload Failed!");
  }

  // save to DB new logoURL
  vendor.brandLogo = fileName;
  await vendor.save();

  return vendor;
};


// for deleting the brandLogo
exports.deleteBrandLogo = async (vendorId)=>{
  // get the vendorId from the controller layer

  const vendor = await Vendors.findByPk(vendorId);
  // get the s3key from the vendor details
  const s3Key = vendor.brandLogo;

  
  // delete the logo
  await deleteObject(s3Key);
  
  //clear entry of DB
  vendor.brandLogo = null;
  
  return await vendor.save();
}