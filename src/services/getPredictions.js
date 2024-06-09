const { Firestore } = require('@google-cloud/firestore');

const getPredictions = async () => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const predsCollection = fs.collection('predictions');
    
    const result = await predsCollection.get();

    let preds = [];
    result.forEach(pred => {
        preds.push(pred.data());
    });

    return preds;
    
}

module.exports = getPredictions;