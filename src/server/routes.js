const {
    getRootHandler, customNotFound, postPredictHandler,
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getRootHandler,
    },
    {
        path: '/predict',
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
        method: '*',
        path: '/{any*}',
        handler: customNotFound,
    }

];

module.exports = routes;