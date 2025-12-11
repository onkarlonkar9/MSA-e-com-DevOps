// import required files
const vendorAuthService = require('../../services/vendorServices/vendorAuthService');

// registering a new vendor
exports.signup = async (req,res)=>{
    try {
        const vendor = await vendorAuthService.registerVendor(req);
        res.status(201).json({message:'Vendor registered successfully', vendor});
    } catch (error) {
        //if any error occurs
        console.error(error);
        res
          .status(error.statusCode || 500)
          .json({ message: error.message || "Something went wrong" });
    }
};

// login for vendor
exports.login = async (req,res) =>{
    try {
        // get vendor and assign a token
        const{ LoggedVendor} = await vendorAuthService.loginVendor(req.body);
        res.cookie('token',LoggedVendor.token,{
            httpOnly:true,
            maxAge:3600000,
            secure:false,
            sameSite:'Lax'});

        res.status(200)
        .json({message:"Login successful",LoggedVendor})
    } catch (error) {
        // if any error occurs
       res
         .status(error.statusCode || 500)
         .json({ message: error.message || "Something went wrong" });
    }
};

exports.logout= async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            sameSite:'Lax'
        })
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went wrong!'})
    }
};
