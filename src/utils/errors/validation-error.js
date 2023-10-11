const { StatusCodes } = require('http-status-codes')


class ValidationError extends Error{
    constructor(error){
        
        super();
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });

        this.name = 'ValidationError';
        this.message = 'Not Able To Validate The Data Sent In The Request';
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }

}

module.exports = ValidationError;