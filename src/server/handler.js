const { modelPredict } = require('../services/inferenceOps');
const savePrediction = require('../services/savePrediction');
const InputError = require('../exceptions/InputError');
const crypto = require('crypto');
const { uploadImage, createBucket } = require('../services/upload');

const getPredictions = require('../services/getPredictions');

const addUserHandler = require('../services/addUser');
const getUserHandler = require('../services/getUser');
const editUserHandler = require('../services/editUser');
const deleteUserHandler = require('../services/deleteUser');
const getUserByIdHandler = require('../services/getUserById');


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

const postUploadHandler = async (request, h) => {

    const { image } = request.payload;
    const { filename: imageName, path: imagePath } = image;

    const destinationPath = `${process.env.BUCKET_UPLOAD_PATH}${imageName}`

    await createBucket();
    await uploadImage(imagePath, destinationPath);


    return 1;
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

    /* Save Image to Google Cloud Storage Bucket */
    

    /* Save Prediction to Firestore */
    const predictId = crypto.randomBytes(8).toString('hex');
    const predictData = {
        result: result,
        ingredients: ingredients,
        recomendations: recomendations,
        image: 'image-url'
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

const getAllPredictionsHandler = async (_request, h) => {
    try {
        const predictions = await getPredictions();
        return h.response({
            status: 'success',
            data: predictions,
        });
    } catch (error) {
        console.error('Error:', error);
        return h.response({
            status: 'fail',
            message: 'Error fetching predictions',
        }).code(500);
    }
};

// User handlers
// Handler to get all users
const getUsersHandler = async (request, h) => {
    const users = await getUsers();
    return h.response({
        status: 'success',
        message: 'Users retrieved successfully',
        data: { users }
    }).code(200);
};

// Handler to get a user by ID
const getUserByIdHandler = async (request, h) => {
    const { id } = request.params;
    const user = await getUserById(id);
    return h.response({
        status: 'success',
        message: 'User retrieved successfully',
        data: { user }
    }).code(200);
};

// Handler to edit user info
const editUserHandler = async (request, h) => {
    const { id } = request.params;
    const { username, password } = request.payload;
    await editUser(id, username, password);
    return h.response({
        status: 'success',
        message: 'User updated successfully'
    }).code(200);
};

// Handler to delete a user
const deleteUserHandler = async (request, h) => {
    const { id } = request.params;
    await deleteUser(id);
    return h.response({
        status: 'success',
        message: 'User deleted successfully'
    }).code(200);
};

module.exports = {
    getRootHandler, 
    customNotFound, 
    postPredictHandler, 
    postUploadHandler, 
    getAllPredictionsHandler,
    getUsersHandler,
    editUserHandler,
    deleteUserHandler,
    getUserByIdHandler};
