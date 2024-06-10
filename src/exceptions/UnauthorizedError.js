class UnauthorizedError extends Error {
    constructor(message){
        super(message);
        this.errorCode = 403;
        this.errorName = 'Unauthorized Error';
    }
}

module.exports = UnauthorizedError;