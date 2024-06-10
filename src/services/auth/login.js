const { Firestore } = require('@google-cloud/firestore');

const InputError = require('../../exceptions/InputError');

const { verifyPassword } = require('../encrypt');

const generateAccessToken = require('./generateAccessToken');

const generateRefreshToken = require('./generateRefreshToken');
const addRefreshToken = require('./addRefreshToken');

const login = async (username, password) => {

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    /*
        1) Verify Valid User
        2) Authenticate User (using Password)
        3) Create Access Token
        4) Create Refresh Token
        5) Save Refresh Token
    */

    // 1)
    const usersCollection = fs.collection('users');
    const result = await usersCollection.where('username', '==', username).get();
    const users = [];
    result.forEach(user => {
        users.push(user.data());
    })

    if(users.length !== 1){
        throw new InputError('Invalid Username/Password!');
    }

    const user = users[0];

    // 2)
    const targetPassword = user.password;

    const isVerified = await verifyPassword(password, targetPassword)
    
    if(!isVerified){
        throw new InputError('Invalid Username/Password!');
    }

    // 3)
    const payload = {
        username: username,
    }

    const token = generateAccessToken(payload);

    // 4)
    const refreshToken = generateRefreshToken(payload);

    // 5)
    await addRefreshToken(refreshToken);

    return {
        accessToken: token,
        refreshToken: refreshToken,
    };


}

module.exports = login;