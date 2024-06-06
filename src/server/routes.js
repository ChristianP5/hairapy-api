const {
    getRootHandler, customNotFound, postPredictHandler, postUploadHandler
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
        method: '*',
        path: '/{any*}',
        handler: customNotFound,
    }

];

module.exports = routes;