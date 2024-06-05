const { server } = require('@hapi/hapi');
const tfjs = require('@tensorflow/tfjs-node');

const loadModel = ()=>{
    let model;

    /* API to Load the Model */
    // model = tfjs.loadGraphModel(process.env.MODEL_URL);

    return model;
};

const modelPredict = async(model, image)=>{
    const tensor = tfjs.node
    .decodeImage(image)
    .resizeNearestNeighbor([224,224])
    .expandDims().toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();

    const classification = 'classification-value';
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

    return { result: classification, ingredients: ingredients, recommendations: recommendations}
}

module.exports = { loadModel, modelPredict };