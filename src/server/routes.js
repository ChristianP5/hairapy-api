const {
    getRootHandler, customNotFound, postPredictHandler,
    postArticleHandler, getArticlesHandler, getArticleByIdHandler,
    deleteArticleHandler, editArticleHandler
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getRootHandler,
    },
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


    {
        method: '*',
        path: '/{any*}',
        handler: customNotFound,
    }

];

module.exports = routes;