const UnauthorizedError = require("../../exceptions/UnauthorizedError");

const isAdmin = (request) => {
    const {username: currentUser} = request.auth.credentials;
    
    if(currentUser !== process.env.ADMIN_USER){
        throw new UnauthorizedError('Unauthorized!');
    }
};

module.exports = isAdmin;