const { Firestore } = require('@google-cloud/firestore');


const getPredictions = async () => {
    try {
        const fs = new Firestore();
        const predictionsCollection = fs.collection('predictions');
        const snapshot = await predictionsCollection.get();
        const predictions = [];

        snapshot.forEach(doc => {
            predictions.push({ id: doc.id, ...doc.data() });
        });

        return predictions;
    } catch (error) {
        console.error('Error fetching predictions:', error);
        throw new Error('Error fetching predictions');
    }
};

module.exports = getPredictions;
