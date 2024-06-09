const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../../exceptions/InputError');

const getUserById = async (id) => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    });

    const usersCollection = fs.collection('users');
    const userDoc = await usersCollection.doc(id).get();

    if (!userDoc.exists) {
        throw new InputError(`User with id=${id} not found!`);
    }

    return { id: userDoc.id, ...userDoc.data() };
};

module.exports = getUserById;
