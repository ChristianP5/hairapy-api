const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../exceptions/InputError');

const getPredictionsById = async (id) => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const predsCollection = fs.collection('predictions');
    const predsDoc = predsCollection.doc(id);
    
    const result = await predsDoc.get();
    const pred = result.data();

    if(!pred){
        throw new InputError(`Prediction with id=${id} not found!`);
    }

    return pred;
    
}

module.exports = getPredictionsById;