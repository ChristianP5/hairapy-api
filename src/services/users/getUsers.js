const { Firestore } = require('@google-cloud/firestore');

const getUsers = async () => {
  const fs = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.FIRESTORE_ID,
  });

  const usersCollection = fs.collection('users');

  const result = await usersCollection.get();

  const users = [];
  result.forEach((user) => {
    users.push(user.data());
  });

  return users;
};

module.exports = getUsers;
