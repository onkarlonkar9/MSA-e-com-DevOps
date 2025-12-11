// import required module
const bcrypt = require('bcryptjs');

// function for hashing password
exports.hashPassword = async (normal) => bcrypt.hash(normal,10);

// function for comparing password
exports.comparePassword = async (normal,hashed)=>bcrypt.compare(normal,hashed);