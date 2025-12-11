//import required modules
const { registerCustomer, loginCustomer, checkLoginStatus} = require("../../services/customerServices/customerAuthService")

// signup a new customer
exports.signUp = async(req,res)=>{
    try {
      // with data send the request to service layer
      const customer = await registerCustomer(req);
      // response with code 201 as request handled successfully
      res
        .status(201)
        .json({ message: "Customer registered Successfully!", customer });
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(error.statusCode || 500).json({message:error.message || 'something went wrong!'})
    }
}

// login a customer 
exports.login = async(req,res)=>{
    try {
      // get customer info and assign token
      const { LoggedCustomer } = await loginCustomer(req);
      res.cookie("token", LoggedCustomer.token, {
        httpOnly: true,
        maxAge: 3600000, //1 hour
        sameSite: "Lax",
      });
      // response with code 200 as request handled successfully
      res
        .status(200)
        .json({ message: "Customer logged in successfully!", LoggedCustomer });
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(error.statusCode || 500).json({message:error.message ||"Something went wrong!!"})
    }
}
exports.logout = async(req,res) =>{
    try {
        //clear the token value from the browser cookies
        res.clearCookie('token',{
            httpOnly:true,
            sameSite:"Lax"
        });
        // response with code 200 as request handled successfully
        res.status(200).json({message:"Logged out successfully!"})
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:"Something went wrong!"})
    }
};


exports.checkIsLoggedIn = async(req,res)=>{
    try {
        // get the userId from the token
        const {customerId} = req.user.id;

        // pass it to the service layer
        const customer = await checkLoginStatus(customerId);

        // if request handled successfully
        res.status(200).json(customer);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error})
    }
};