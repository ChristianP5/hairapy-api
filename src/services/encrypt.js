const bcrypt = require('bcrypt');

const hashPassword = async (plaintext) => await bcrypt.hash(plaintext, 10);

const verifyPassword = async (plaintext, hashedtext) => await bcrypt.compare(plaintext, hashedtext);

module.exports = {
  hashPassword, verifyPassword,
};
