const jwt = require('@hapi/jwt');

const generateRefreshToken = (payload) => {
    return jwt.token.generate(payload, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = generateRefreshToken;