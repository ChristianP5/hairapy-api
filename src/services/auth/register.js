const addUser = require("../users/addUser");
const addRefreshToken = require("./addRefreshToken");
const generateAccessToken = require("./generateAccessToken");
const generateRefreshToken = require("./generateRefreshToken");

const register = async (id, username, password) => {

    /*
        1) Create User
        2) Create Access and Refresh Token
        3) Save Refresh Token
    */

        // 1)
        await addUser(id, username, password);

        // 2)
        const payload = {
            username: username,
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // 3)
        await addRefreshToken(refreshToken);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            id: id,
        };

}

module.exports = register;