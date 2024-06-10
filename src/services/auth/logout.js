const deleteRefreshToken = require("./deleteRefreshToken");


const logout = async (refreshToken) => {
    
        await deleteRefreshToken(refreshToken);

    return true;
}

module.exports = logout;