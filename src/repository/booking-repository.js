const { ValidationError, AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');
const { Booking } = require('../models/index');

class BookingRepository{

    async create(data){
        try {

            const booking = await Booking.create(data);
            return booking;

        } catch (error) {

            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'cannot create booking',
                'there was some issue created during booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(data){
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = BookingRepository;