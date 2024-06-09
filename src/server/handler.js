const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { modelPredict } = require('../services/inferenceOps');
const savePrediction = require('../services/savePrediction');
const InputError = require('../exceptions/InputError');
const { uploadImage, createBucket } = require('../services/upload');

const addArticle = require('../services/articles/addArticle');
const getArticles = require('../services/articles/getArticles');
const getArticleById = require('../services/articles/getArticleById');
const deleteArticle = require('../services/articles/deleteArticle.js');
const editArticle = require('../services/articles/editArticle');

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
    const { filename: imageName, path: imagePath } = image;

    const imageRaw = fs.readFileSync(imagePath);

    /* Use the Loaded Model */
    const { model } = request.server.app;
    let { result, confidenceScore, ingredients, recomendations } = await modelPredict(model, imageRaw);

    const createdAt = new Date().toISOString();
    console.log(createdAt);

    // Default Values
    // result = 'classification-value';
    // confidenceScore = 100;
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

    /* Save Image to Google Cloud Storage Bucket */

    const imageExt = imageName.split('.')[1];
    const newImageName = `input-image-${crypto.randomBytes(4).toString('hex')}.${imageExt}`

    const destinationPath = `${process.env.BUCKET_UPLOAD_PATH}${newImageName}`

    await createBucket();
    await uploadImage(imagePath, destinationPath);

    /* Save Prediction to Firestore */
    const predictId = crypto.randomBytes(8).toString('hex');
    const predictData = {
        result: result,
        confidenceScore: confidenceScore,
        ingredients: ingredients,
        recomendations: recomendations,
        image: `${process.env.SAVED_PREDICTION_IMG_URL}${newImageName}`,
        createdAt: createdAt,
    }

    await savePrediction(predictId, predictData);


    const response = h.response({
        status: 'success',
        message: 'Prediction Success!',
        data: {
            result: result,
            confidenceScore: confidenceScore,
            ingredients: ingredients,
            recomendations: recomendations,
            createdAt: createdAt,
        }
    })

    response.code(200);
    return response;
}

// Articles --------------------------------------------

const postArticleHandler = async (request, h) => {
    
    let image, title, content;
    try {
        const { title: reqTitle, content: reqContent, image: reqImage } = request.payload || {};
        if (!reqTitle || !reqContent || !reqImage) {
            throw new Error('Missing required fields in payload');
        }
        title = reqTitle;
        content = reqContent;
        image = reqImage;
    } catch (error) {
        console.error(error.stack);
        throw new InputError('Invalid input data');
    }

    const id = crypto.randomBytes(6).toString('hex');

    
    await addArticle(id, image, title, content);

    const response = h.response({
        status: 'success',
        message: 'Article Added Successfully!',
        data: {
            articleID:id
        }
    })

    response.code(201);
    return response;
}

const getArticlesHandler = async (request, h) => {

    const articles = await getArticles();

    const response = h.response({
        status: 'success',
        message: 'Articles Retrieved!',
        data: {
            articles: articles,
        }
    })

    response.code(200);

    return response;
}

const getArticleByIdHandler = async (request, h) => {
    
    const { id } = request.params;
    
    const article = await getArticleById(id);
    
    const response = h.response({
        status: 'success',
        message: `Article with id=${id} Retrieved!`,
        data: {
            article: article,
        }
    })

    response.code(200);

    return response;

}

const deleteArticleHandler = async (request, h) => {

    const { id } = request.params;

    await deleteArticle(id);

    const response = h.response({
        status: 'success',
        message: `Article with id=${id} Deleted!`,
    })

    response.code(200);

    return response;
}

const editArticleHandler = async (request, h) => {

    const { id } = request.params;
    
    let image, title, content;
    try {
        const { title: reqTitle, content: reqContent, image: reqImage } = request.payload || {};
        if (!reqTitle || !reqContent || !reqImage) {
            throw new Error('Missing required fields in payload');
        }
        title = reqTitle;
        content = reqContent;
        image = reqImage;
    } catch (error) {
        console.error(error.stack);
        throw new InputError('Invalid input data');
    }

    await editArticle(id, title, content, image);

    const response = h.response({
        status: 'success',
        message: `Article with id=${id} Updated!!`,
    })

    response.code(201);

    return response;
}

module.exports = {
    getRootHandler, customNotFound, postPredictHandler,
    postArticleHandler, getArticlesHandler, getArticleByIdHandler,
    deleteArticleHandler, editArticleHandler
};
