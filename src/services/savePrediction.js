const { Firestore } = require('@google-cloud/firestore');

const savePrediction = async (id, data) => {
  const fs = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.FIRESTORE_ID,
  });

  const predictionsCollection = fs.collection('predictions');
  const predictionDoc = predictionsCollection.doc(id);
  return await predictionDoc.set(data);
};

module.exports = savePrediction;
