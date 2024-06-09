const { Firestore } = require('@google-cloud/firestore');

const getUsers = async () => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    });

    // accessing "users" collection
    const usersCollection = fs.collection('users');

    //get all documents in the collection
    const snapshot = await usersCollection.get();

    // create an array for use,
    // Extract the document ID and data, then add it to the users array
    const users = [];
    snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
    });

    return users;
};

module.exports = getUsers;
