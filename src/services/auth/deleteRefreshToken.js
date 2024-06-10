const { Firestore } = require('@google-cloud/firestore');
const getRefreshTokenByRT = require('./getRefreshTokenByRT');

const deleteRefreshToken = async (refreshToken) => {

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    /*
        1) Does Refresh Token Exist?
        2) Delete Refresh Token
    */

    // 1)
    const targetrefreshToken = await getRefreshTokenByRT(refreshToken);

    // 2)
    const targetId = targetrefreshToken.id;

    const rtCollection = fs.collection('refreshTokens');
    const rtDoc = rtCollection.doc(targetId);

    await rtDoc.delete();

    return true;
}

module.exports = deleteRefreshToken;