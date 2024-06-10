const generateAccessToken = require("./generateAccessToken");
const getRefreshTokenByRT = require("./getRefreshTokenByRT");

const jwt = require('@hapi/jwt');

const renewToken = async (refreshToken) => {
    /*
        1) Verify Refresh Token Exists
        2) Create Access Token
    */

    // 1)
    await getRefreshTokenByRT(refreshToken);

    // 2)
    const decodedToken = jwt.token.decode(refreshToken);
    const { username } = decodedToken.decoded.payload;

    const payload = {
        username: username,
    }

    const token = generateAccessToken(payload);

    return token;
}

module.exports = renewToken;