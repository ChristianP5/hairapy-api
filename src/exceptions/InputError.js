class InputError extends Error {
    constructor(message){
        super(message);
        this.errorCode = 500;
        this.errorName = 'InputError';
    }
}

module.exports = InputError;