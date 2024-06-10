const { Firestore } = require('@google-cloud/firestore');
const crypto = require('crypto');

const InputError = require('../../exceptions/InputError');

const addRefreshToken = async (refreshToken) => {

    const id = crypto.randomBytes(8).toString('hex');

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const rtCollection = fs.collection('refreshTokens');
    const rtDoc = rtCollection.doc(id);

    const createdAt = new Date().toISOString();

    const data = {
        id: id,
        refreshToken: refreshToken,
        createdAt: createdAt,
    }

    await rtDoc.set(data);

    return true;
    
}

module.exports = addRefreshToken;