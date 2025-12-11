// import required files
const {Vendors}= require('../../models');
const { deleteObject } = require('../../utils/deleteObject');
const { getSignedS3URL } = require('../../utils/getSignedS3URL');
const {hashPassword} = require('../../utils/Password');

// get specific vendor details

exports.getVendorDetails = async(vendorId) =>{
    // find the vendor using vendorId
    const vendorDetails = await Vendors.findByPk(vendorId);
    // as we allowing vendor to fetch details only if while logged in hence no need handle "vendor not found scenario"

    // extract the key from vendorDetails to get signedURL
    const imageKey = vendorDetails.brandLogo;
    // if imageKey/brandLogo is not present
    if (!imageKey) return vendorDetails;
    
    // get signedS3URL from our utils function
    const signedS3URL = await getSignedS3URL(imageKey)
  
    //convert model instance to plain object
    const plainVendor = vendorDetails.get({plain:true});

    return{...plainVendor, brandLogo:signedS3URL};
};

// update the vendor details 
exports.updateVendorAccount = async(vendorId,data) => {
  // get vendor details by vendorId
  const vendor = await Vendors.findByPk(vendorId);
  console.log(vendor);
  let updatedVendor  = data;
  // if user want to update password
  if (data.password){
    const newPassword =await hashPassword(data.password);
    // update the vendor with hashed password
    updatedVendor = {...data,password:newPassword}
  }
  // update the vendor with updated data
  return await vendor.update(updatedVendor)
};

exports.deleteAVendorAccount = async(vendorId) =>{
    // delete a vendor account from db
    const vendorToBeDeleted = await Vendors.findByPk(vendorId);

    //get s3 url from vendorToBeDeleted
    const s3Key = vendorToBeDeleted.brandLogo;
    
    // delete from s3
    await deleteObject(s3Key);

    // delete the vendor
    return await vendorToBeDeleted.destroy();
}