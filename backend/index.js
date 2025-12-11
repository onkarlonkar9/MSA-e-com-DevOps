// import required modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// importing routes
// vendorsRoutes
const vendorAuthRoutes = require('./routes/vendorRoutes/vendorAuthRoutes');
const vendorProductRoutes = require("./routes/vendorRoutes/vendorProductRoutes");
const vendorProfileRoutes = require("./routes/vendorRoutes/vendorProfileRoutes");
const vendorBrandLogoRoutes = require('./routes/vendorRoutes/vendorBrandLogoRoutes');
const vendorOrderRoutes = require('./routes/vendorRoutes/vendorOrderRoutes.js');

// customerRoutes
const customerAuthRoutes = require('./routes/customerRoutes/customerAuthRoutes.js');
const customerProfileRoutes = require('./routes/customerRoutes/customerProfileRoutes.js');
const customerAddressRoutes = require('./routes/customerRoutes/customerAddressRoutes.js');
const customerProductRoutes = require('./routes/customerRoutes/customerProductRoutes.js');
const customerCartRoutes = require('./routes/customerRoutes/customerCartRoute.js');
const customerOrderRoutes = require('./routes/customerRoutes/customerOrderRoute');
const customerPaymentRoutes = require("./routes/customerRoutes/customerPaymentRoute.js");

// config the dotenv
dotenv.config();

// initiate port
const PORT = process.env.PORT || 8001;

// initiating app
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const allowedOrigin =['http://localhost:5173','http://localhost:5174']

app.use(cors({origin:allowedOrigin,credentials:true}));

app.use('/api/vendor',[vendorAuthRoutes,vendorProductRoutes,vendorProfileRoutes,vendorBrandLogoRoutes,vendorOrderRoutes]);
app.use('/api/customer',[customerAuthRoutes,customerProfileRoutes,customerAddressRoutes,customerProductRoutes,customerCartRoutes,customerOrderRoutes,customerPaymentRoutes]);

// listening 
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});
