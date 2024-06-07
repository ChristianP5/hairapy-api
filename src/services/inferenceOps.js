const tfjs = require('@tensorflow/tfjs-node');

const loadModel = async ()=>{
    let model;

    /* API to Load the Model */
    console.log('Building Model...');
    model = await tfjs.loadLayersModel(process.env.MODEL_URL);

    console.log('Building Model Succes!!');
    return model;
};

const modelPredict = async(model, image)=>{
    const tensor = tfjs.node
    .decodeImage(image)
    .resizeNearestNeighbor([224,224])
    .expandDims().toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();

    const confidenceScore = Math.max(...score)*100;
    // console.log(confidenceScore);

    const result = tfjs.argMax(prediction, 1).dataSync()[0];

    const classifications = ['Dandruff', 'Hair Greasy', 'Hair Loss', 'Psoriasis'];
    const predicted_class = classifications[result];

    const classification = predicted_class;
    const ingredients = [
        "ingredient-1",
        "ingredient-2",
        "ingredient-3"
    ]
    const recommendations = [
        {
            image: 'rec1-image-url',
            name: 'rec1-name'
        },
        {
            image: 'rec2-image-url',
            name: 'rec2-name'
        },
    ]

    return { result: classification, confidenceScore: confidenceScore, ingredients: ingredients, recommendations: recommendations}
}

module.exports = { loadModel, modelPredict };