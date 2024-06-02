const getRootHandler = (request, h)=>{
    return h.response({
        status: 'success',
        message: 'Welcome to Root!'
    })
}

module.exports = {
    getRootHandler
};