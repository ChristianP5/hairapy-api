const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../../exceptions/InputError');

const getRefreshTokenByRT = async (refreshToken) => {

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const rtCollection = fs.collection('refreshTokens');
    
    const result = await rtCollection.where('refreshToken', '==', refreshToken).get();
    const result_rt = [];
    result.forEach(rt => {
        result_rt.push(rt.data());
    })

    if(result_rt.length !== 1){
        throw new InputError('Refresh Token not found!');
    }

    return result_rt[0];

}

module.exports = getRefreshTokenByRT;