// import required modules
const jwt = require('jsonwebtoken');

// function to generate token for vendor

function generateVendorAuthToken (user){

    const token = jwt.sign({
        id:user.vendorId, role:'vendor'
    },
        // secret key for token
        process.env.JWT_SECRET,

        // token expiration time
        {expiresIn:'1h'}
    )
    return token;
}

// function to generate token for vendor

function generateCustomerAuthToken (user){

    const token = jwt.sign({
        id:user.customerId, role:'customer'
    },
        // secret key for token
        process.env.JWT_SECRET,

        // token expiration time
        {expiresIn:'1h'}
    )
    return token;
}
module.exports = {generateVendorAuthToken, generateCustomerAuthToken};