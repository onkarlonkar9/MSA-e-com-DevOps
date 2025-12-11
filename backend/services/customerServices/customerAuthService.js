// import required modules
const {Customers} = require('../../models');
const { hashPassword, comparePassword } = require('../../utils/Password');
const {generateCustomerAuthToken }= require('../../utils/Tokengeneration');

// register a new customer
exports.registerCustomer = async(req)=>{
    // get required info from req
    const {email,fullName,password,contactNumber} = req.body;

    // check that if any customer exits with same email id
    const isExisting = await Customers.findOne({where:{email}});

    if (isExisting) {
        const error = new Error('Email already registered!');
        error.statusCode = 400;
        throw error;        
    }

    // if customer not exists then hash password
    const hashedPassword = await hashPassword(password);

    // now create a new entry in db;
    const newCustomer = await Customers.create({
        email,
        fullName,
        contactNumber,
        password:hashedPassword
    })
    return newCustomer;

} 

// logged in a customer 
exports.loginCustomer = async(req)=>{
  // get email and password from req.body
  const { email, password } = req.body;
  const customer = await Customers.findOne({ where: { email } });

  // if customer not found then
  if (!customer) {
    const error = new Error(
      `You don't have an account with us or email is incorrect!!`
    );
    error.statusCode = 404;
    throw error;
  }

  // check the password
  const checkPassword = await comparePassword(password, customer.password);

  // if password mismatch from db
  if (!checkPassword) {
    const error = new Error("Invalid Password");
    error.statusCode = 401;
    throw error;
  }

//   generate token if password is correct
  const token = generateCustomerAuthToken(customer);

  // get only necessary data from sequelize
  const plainCustomer = customer.toJSON();

  // combine vendor and token together
  const LoggedCustomer = { ...plainCustomer, token };

  return {LoggedCustomer};
}

exports.checkLoginStatus = async(customerId)=>{
  // find the customer using customerId
  const loggedCustomer = await Customers.findByPk(customerId);

  return loggedCustomer;
};