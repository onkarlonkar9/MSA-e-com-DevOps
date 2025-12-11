// import required modules
const {Customers} = require('../../models');
const { hashPassword } = require('../../utils/Password');

// get profile data of customer from db
exports.getProfileDetails = async(customerId)=>{
  // get data from controller level
  const customer = await Customers.findByPk(customerId);
  // as we allowing customer to fetch details only if while logged in hence no need handle "customer not found scenario"
  return customer;
};

// update profile data of customer 
exports.updateProfile = async(customerId,data) =>{
  // get customer details by customerId
  const customer = await Customers.findByPk(customerId);

  // assign new  data to a new object
  let updatedCustomer = data;

  // if user want to update a password 
  if (data.password){
    const newPassword = await hashPassword(data.password);

    // update the data
    updatedCustomer = {...data,password:newPassword}
  }

  // update the customer with new data
  return await customer.update(updatedCustomer)
};

// delete customer profile/account

exports.deleteCustomer = async (customerId)=>{
  // got customer Id from controller layer
  const customerToDelete = await Customers.findByPk(customerId);

  return await customerToDelete.destroy();
}
