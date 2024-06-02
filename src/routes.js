const {
    getRootHandler, customNotFound
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getRootHandler,
    },
    {
        method: '*',
        path: '/{any*}',
        handler: customNotFound,
    }

];

module.exports = routes;