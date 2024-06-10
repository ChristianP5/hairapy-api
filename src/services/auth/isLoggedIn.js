const InputError = require("../../exceptions/InputError");

const isLoggedIn = (request) => {
    if(request.auth.isAuthenticated){
        throw new InputError('Already Authenticated');
    }
}

module.exports = isLoggedIn;
