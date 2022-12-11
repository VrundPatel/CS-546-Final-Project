const bcrypt = require('bcrypt');

const hashPassword = async(pass) => {
  try {
    const hash = await bcrypt.hash(pass, 10);
    return hash;
  } catch (e) {
    // throw internalServerErr('Error while trying to hash password. Please try again');
  }
}

const comparePassword = async (pass, hash) => {
  try {
    const matched = await bcrypt.compare(pass, hash);
    return matched;
  } catch (e) {
    // throw internalServerErr('Error checking password. Please try again');
  }
};

module.exports = {
  hashPassword,
  comparePassword
}