// import  the required modules
const vendorBrandLogoServices = require("../../services/vendorServices/vendorBrandLogoService");

exports.addNewBrandLogo = async (req, res) => {
  try {
    // get vendorId from the jwt
    const vendorId = req.user.id;

    const file = req.file;

    // pass the data to the service layer

    const brandLogo = await vendorBrandLogoServices.AddBrandLogo(
      vendorId,
      file
    );

    // if request handled successfully
    res.status(200).json({ message: "Image uploaded successfully!" });
  } catch (error) {
    // if any error occurs
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLogo = async (req,res)=>{
  try {
    // get the vendorId from the jwt token
    const vendorId = req.user.id;
    
    // pass it to the service layer
    const deleteLogo =await vendorBrandLogoServices.deleteBrandLogo(vendorId);

    // if request handled successfully
    res.status(200).json({message:"brand logo deleted successfully!"})
  } catch (error) {
    //if any error occurs
    console.log(error);
    res.status(500).json({  message:error.message})
  }
}