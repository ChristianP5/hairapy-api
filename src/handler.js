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

module.exports = {
    getRootHandler, customNotFound
};