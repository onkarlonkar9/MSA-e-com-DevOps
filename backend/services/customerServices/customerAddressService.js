// import required modules
const {Addresses} = require('../../models');

// add a new address
exports.addAddress = async(customerId,req)=>{
    // get the customerId and data from the controller
    const {fullName,email,contactNumber,addressLine,landMark,city,district, state, postalCode, country, addressType,isDefault} = req.body;

    // if isDefault is true then set all other that customer specific to false
    if (isDefault){
        await Addresses.update(
            {isDefault:false},
            {where:{customerId}}
        )
    }

    // create a new entry in db
    const addressToAdd = await Addresses.create({
        customerId:customerId,
        fullName,
        email,
        contactNumber,
        addressLine,
        landMark,
        city,
        district,
        state,
        postalCode,
        country,
        addressType,
        isDefault
    });

    // return new address to controller level
    return addressToAdd;

};

// get all address for that customer
exports.getAddress = async(customerId)=>{
    // get the customerId from the controller layer
    const allAddresses = await Addresses.findAll({where:{customerId}});
    
    // return the all addresses to the service layer
    return allAddresses;
};

// update an address 
exports.updateAddress = async(customerId, addressId, data)=>{
    // get customerId, addressId, data from the controller layer
    const address = await Addresses.findOne({
        where:{
            customerId:customerId,
            addressId:addressId
        }
    })
    
    // if address not found
    if (!address){
        throw new Error("Address not found")    
    };
    // check if user want set default address
    if (data.isDefault){
        await Addresses.update(
            {isDefault:false},
            {where:{customerId}}
        )
    };
    
    // update the address
    const updatedAddress =  await address.update(data)

    // return to controller layer
    return updatedAddress;
};

exports.deleteAddress = async(customerId, addressId)=>{
    // get the customerId and addressId from the controller layer

    // find the address in db using customerId, addressId
    const address = await Addresses.findOne({where:{
        customerId:customerId,
        addressId:addressId
    }});
    
    if (!address){
        throw new Error("Address not found")
    }

    // delete the address
    return await address.destroy();
};

exports.setDefault = async(customerId,addressId)=>{
    // get the customerId and addressId from the controller layer

    // find the address in db using customerId, addressId
    const address = await Addresses.findOne({where:{
        customerId:customerId,
        addressId:addressId
    }});

    // make all address isDefault to false
    await Addresses.update(
        {isDefault:false},
        {where:{customerId}}
    )

    await address.update({isDefault:true})

    return address;

};

exports.getDefaultAddress = async (customerId)=>{
  // get the customerId and addressId from the controller layer

  const address = await Addresses.findOne({
    where:{customerId,isDefault:true}
  });
  return address;
}