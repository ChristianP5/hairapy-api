const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../../exceptions/InputError');

const deleteUser = async (id) => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    });

    // accessing "users" collection
    const usersCollection = fs.collection('users');
    const userDoc = usersCollection.doc(id);
    const userSnapshot = await userDoc.get();

    // Check if the user exists
    if (!userSnapshot.exists) {
        throw new InputError(`User with id=${id} not found!`);
    }

    // Delete the document
    await userDoc.delete();
};

module.exports = deleteUser;
