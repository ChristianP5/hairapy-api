const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../../exceptions/InputError');

const editUser = async (id, username, password) => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    });

    const usersCollection = fs.collection('users');

    // getting the document correspoding to the id
    const userDoc = usersCollection.doc(id);
    const userSnapshot = await userDoc.get();

    // Check if the user exists
    if (!userSnapshot.exists) {
        throw new InputError(`User with id=${id} not found!`);
    }

    // Update the document with the new username and password
    await userDoc.update({ username, password });
};

module.exports = editUser;
