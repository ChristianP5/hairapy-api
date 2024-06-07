const { modelPredict } = require('../services/inferenceOps');
const savePrediction = require('../services/savePrediction');
const InputError = require('../exceptions/InputError');
const crypto = require('crypto');
const { uploadImage, createBucket } = require('../services/upload');

const getRootHandler = (request, h)=>{
    return h.response({
        status: 'success',
        message: 'Welcome to Root!'
    })
};

const customNotFound = (request, h)=>{
    const response = h.response({
        status: 'fail',
        message: 'You seem to be lost!',
    });

    response.code(404);
    return response;
}

const postPredictHandler = async (request, h)=>{

    let result, ingredients, recomendations

    // Default Values
    result = 'classification-value';
    ingredients = [
        "ingredient-1",
        "ingredient-2",
        "ingredient-3"
    ];
    recomendations = [
        {
            image: 'rec1-image-url',
            name: 'rec1-name'
        },
        {
            image: 'rec2-image-url',
            name: 'rec2-name'
        },
    ]

    /* Use the Loaded Model */
    // const { model } = request.server.app;

    // const { result, ingredients, recomendations } = await modelPredict(image) 

    /* Save Image to Google Cloud Storage Bucket */
    const { image } = request.payload;
    const { filename: imageName, path: imagePath } = image;

    const imageExt = imageName.split('.')[1];
    const newImageName = `input-image-${crypto.randomBytes(4).toString('hex')}.${imageExt}`

    const destinationPath = `${process.env.BUCKET_UPLOAD_PATH}${newImageName}`

    await createBucket();
    await uploadImage(imagePath, destinationPath);

    /* Save Prediction to Firestore */
    const predictId = crypto.randomBytes(8).toString('hex');
    const predictData = {
        result: result,
        ingredients: ingredients,
        recomendations: recomendations,
        image: `${process.env.SAVED_PREDICTION_IMG_URL}${newImageName}`,
    }

    await savePrediction(predictId, predictData);


    const response = h.response({
        status: 'success',
        message: 'Prediction Success!',
        data: {
            result: result,
            ingredients: ingredients,
            recomendations: recomendations,

        }
    })

    response.code(200);
    return response;
}

module.exports = {
    getRootHandler, customNotFound, postPredictHandler, 
};
