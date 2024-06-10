const jwt = require('@hapi/jwt');

const generateAccessToken = (payload) => {
    return jwt.token.generate(payload, process.env.ACCESS_TOKEN_SECRET, {
        ttlSec: 150,
    })
}

module.exports = generateAccessToken;