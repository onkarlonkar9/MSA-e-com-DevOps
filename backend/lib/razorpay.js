// import required modules
const Razorpay = require('razorpay');

const rzp = new Razorpay({
    key_id:process.env.razorPay_key,
    key_secret:process.env.razorPay_secret_key
});

module.exports = rzp;