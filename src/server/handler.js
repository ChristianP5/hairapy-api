const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Preictions
const { modelPredict } = require('../services/inferenceOps');
const savePrediction = require('../services/savePrediction');
const InputError = require('../exceptions/InputError');
const { uploadImage, createBucket } = require('../services/upload');
const getPredictions = require('../services/getPredictions.js');
const getPredictionsById = require('../services/getPredictionsById');

// Articles
const addArticle = require('../services/articles/addArticle');
const getArticles = require('../services/articles/getArticles');
const getArticleById = require('../services/articles/getArticleById');
const deleteArticle = require('../services/articles/deleteArticle.js');
const editArticle = require('../services/articles/editArticle');

// Users
const addUser = require('../services/users/addUser');
const getUsers = require('../services/users/getUsers');
const getUserById = require('../services/users/getUserById');
const editUser = require('../services/users/editUser');
const deleteUser = require('../services/users/deleteUser');

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
    let { result, confidenceScore, ingredients, recommendations } = await modelPredict(model, imageRaw);

    const createdAt = new Date().toISOString();

    
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
        recomendations: recommendations,
        image: `${process.env.SAVED_PREDICTION_IMG_URL}${newImageName}`,
        createdAt: createdAt,
        id: predictId,
    }

    await savePrediction(predictId, predictData);


    const response = h.response({
        status: 'success',
        message: 'Prediction Success!',
        data: {
            result: result,
            confidenceScore: confidenceScore,
            ingredients: ingredients,
            recomendations: recommendations,
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

const getPredictsHandler = async (request, h) => {

    const preds = await getPredictions();
    const response = h.response({
        status: 'success',
        message: 'Predictions Retrieved!',
        data: {
            predictions: preds,
        }
    })

    response.code(200);

    return response;
}

const getPredictsByIdHandler = async (request, h) => {

    const { id } = request.params;

    const pred = await getPredictionsById(id);

    const response = h.response({
        status: 'success',
        message: `Prediction with id=${id} found!`,
        data: {
            prediction: pred,
        }
    })

    response.code(200);
    return response;
}

const postUsersHandler = async (request, h) => {

    let username, password;
    try{
        const { username: reqUsername, password: reqPassword } = request.payload;
        if(!reqUsername || !reqPassword){
            throw new InputError('Please enter Username/Password');
        }

        username = reqUsername;
        password = reqPassword;

    }catch(error){
        throw new InputError('Please enter Username/Password');
    }

    const id = crypto.randomBytes(8).toString('hex');

    await addUser(id, username, password);

    const response = h.response({
        status: 'success',
        message: `${username} added successfully!`,
        data: {
            userID: id,
        }

    })
    response.code(201);
    return response;;
}

const getUsersHandler = async (request, h) => {

    const users = await getUsers();
    
    const response = h.response({
        status: 'succees',
        message: 'Users Retrieved Successfully!',
        data: {
            users: users,
        }
    })

    response.code(200);

    return response;
}

const getUserByIdHandler = async (request, h) => {

    const { id } = request.params;

    const user = await getUserById(id);

    const response = h.response({
        status: 'success',
        message: `User with id=${id} found!`,
        data: {
            user: user,
        }
    })

    response.code(200);
    
    return response;
}

const editUserHandler = async (request, h) => {

    let username, password;
    try{
        const { username: reqUsername, password: reqPassword } = request.payload;
        if(!reqUsername || !reqPassword){
            throw new InputError('Please Input Username and Password Value!');
        }

        username = reqUsername;
        password = reqPassword;

    }catch(error){
        throw new InputError(error.message);
    }
    
    const { id } = request.params;

    await editUser(id, username, password)

    const response = h.response({
        status: 'success',
        message: `User with id=${id} Updated Successfully!`,
    })

    response.code(200);

    return response;
}

const deleteUserHandler = async (request, h) => {

    const { id } = request.params;
    await deleteUser(id);

    const response = h.response({
        status: 'success',
        message: `User with id=${id} Deleted Successfully!`,
    })

    response.code(200);
    return response;
}

module.exports = {
    getRootHandler, customNotFound, postPredictHandler,
    postArticleHandler, getArticlesHandler, getArticleByIdHandler,
    deleteArticleHandler, editArticleHandler,
    getPredictsHandler, getPredictsByIdHandler,
    postUsersHandler, getUsersHandler,
    getUserByIdHandler, editUserHandler,
    deleteUserHandler
};
