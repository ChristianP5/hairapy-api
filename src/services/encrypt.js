const bcrypt = require('bcrypt');

const hashPassword = async (plaintext) => {
    return await bcrypt.hash(plaintext, 10);
}

const verifyPassword = async (plaintext, hashedtext) => {
    return await bcrypt.compare(plaintext, hashedtext);
}

module.exports = {
    hashPassword, verifyPassword
};