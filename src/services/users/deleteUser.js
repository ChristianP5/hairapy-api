const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../../exceptions/InputError');

const deleteUser = async (id) => {
  const fs = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.FIRESTORE_ID,
  });

  const usersCollection = fs.collection('users');
  const userDoc = usersCollection.doc(id);

  const result = await userDoc.get();
  const user = result.data();

  if (!user) {
    throw new InputError(`User with id=${id} not found!`);
  }

  await userDoc.delete();

  return true;
};

module.exports = deleteUser;
