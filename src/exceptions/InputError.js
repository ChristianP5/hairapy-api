class InputError extends Error {
    constructor(message){
        super(message);
        this.errorCode = 400;
        this.errorName = 'InputError';
    }
}

module.exports = InputError;