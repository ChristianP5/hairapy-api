const {
    getRootHandler
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getRootHandler,
    },

];

module.exports = routes;