const {
    getRootHandler, customNotFound, postPredictHandler,
    postArticleHandler, getArticlesHandler, getArticleByIdHandler,
    deleteArticleHandler, editArticleHandler,
    getPredictsHandler, getPredictsByIdHandler,
    postUsersHandler, getUsersHandler,
    getUserByIdHandler, editUserHandler,
    deleteUserHandler, postLoginHandler,
    postTokenHandler, postLogoutHandler,
    postRegisterHandler
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getRootHandler,
    },

    // Auth
    {
        path: '/api/login',
        method: 'POST',
        handler: postLoginHandler,
        options: {
            auth: {
                mode: 'try',
            }
        }
    },
    {
        path: '/api/token',
        method: 'POST',
        handler: postTokenHandler,
        options: {
            auth: {
                mode: 'try',
            }
        }
    },
    {
        path: '/api/logout',
        method: 'DELETE',
        handler: postLogoutHandler,
    },
    {
        path: '/api/register',
        method: 'POST',
        handler: postRegisterHandler,
        options: {
            auth: {
                mode: 'try',
            }
        }
    },

    // Predictions --------------------------------------
    {
        path: '/api/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                output: 'file',
                maxBytes: 100000000
            }
        }
    },
    {
        path: '/api/predicts',
        method: 'GET',
        handler: getPredictsHandler,
    },
    {
        path: '/api/predicts/{id}',
        method: 'GET',
        handler: getPredictsByIdHandler,
    },

    // Articles ---------------------------------------------
    {
        path: '/api/articles',
        method: 'POST',
        handler: postArticleHandler,
        options: {
            payload: {
                multipart: true,
                allow: 'multipart/form-data',
                output: 'file',
                maxBytes: 100000000,
            }
        }
    },
    {
        path: '/api/articles',
        method: 'GET',
        handler: getArticlesHandler,
    },
    {
        path: '/api/articles/{id}',
        method: 'GET',
        handler: getArticleByIdHandler,
    },
    {
        path: '/api/articles/{id}',
        method: 'DELETE',
        handler: deleteArticleHandler,
    },
    {
        path: '/api/articles/{id}',
        method: 'PUT',
        handler: editArticleHandler,
        options: {
            payload: {
                multipart: true,
                allow: 'multipart/form-data',
                output: 'file',
                maxBytes: 100000000,
            }
        }
    },

    // Users -----------------------------------
    {
        path: '/api/users',
        method: 'POST',
        handler: postUsersHandler,
    },
    {
        path: '/api/users',
        method: 'GET',
        handler: getUsersHandler,
    },
    {
        path: '/api/users/{id}',
        method: 'GET',
        handler: getUserByIdHandler,
    },
    {
        path: '/api/users/{id}',
        method: 'PUT',
        handler: editUserHandler,
    },
    {
        path: '/api/users/{id}',
        method: 'DELETE',
        handler: deleteUserHandler,
    },

    {
        method: '*',
        path: '/{any*}',
        handler: customNotFound,
    }

];

module.exports = routes;