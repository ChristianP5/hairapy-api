const { modelPredict } = require('../services/inferenceOps');

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

    const { image } = request.payload;

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
    getRootHandler, customNotFound, postPredictHandler
};