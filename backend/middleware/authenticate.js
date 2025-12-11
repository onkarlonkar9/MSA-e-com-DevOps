// import required files
const jwt = require('jsonwebtoken');
const {Admins,Vendors,Customers} = require('../models');


const authenticate = async(req,res,next)=>{
    // check if token is present in cookies
    const token = req.cookies?.token 
    
    // if not
    if (!token)return res.status(401).json({message:"Unauthorized!!"});

    try {
        // check user have valid token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        // initiate a user
        let user;

        if (decoded.role ==='vendor') user = await Vendors.findByPk(decoded.id);

        if (decoded.role ==='customer') user = await Customers.findByPk(decoded.id);

        if(!user) return res.status(401).json({message:"User not found"});
        
        req.user = {
            id:decoded.id,
            role:decoded.role
        }
        next();

    } catch (error) {
        return res.status(403).json({message:"Invalid or expired token",error})
    }
};

module.exports = authenticate;
