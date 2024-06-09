const {
    getRootHandler, 
    customNotFound, 
    postPredictHandler, 
    postUploadHandler,
    getAllPredictionsHandler,
    // getSavedPredictionByIdHandler,
    // createUserHandler,
    // getAllUsersHandler,
    // getUserByIdHandler,
    // updateUserHandler,
    // deleteUserHandler
} = require('./handler');


const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getRootHandler,
    },
    {
        method: 'POST',
        path: '/upload',
        handler: postUploadHandler,
        options: {
            payload: {
                multipart: true,
                allow: `multipart/form-data`,
                output: 'file',
            }
        }
    },
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
            }
        }
    },
    {
        method: 'GET',
        path: '/predictions',
        handler: getAllPredictionsHandler,
    },
    {
        method: 'POST',
        path: '/users',
        handler: addUserHandler,
    },
    {
        method: 'GET',
        path: '/users',
        handler: getAllUsersHandler,
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: getUserByIdHandler,
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: editUserHandler,
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: deleteUserHandler,
    },
    {
        method: '*',
        path: '/{any*}',
        handler: customNotFound,
    }

];

module.exports = routes;