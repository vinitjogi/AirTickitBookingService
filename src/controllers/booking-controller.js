const { StatusCodes } = require('http-status-codes')
const { BookingService } = require('../services/index');
// const { createChannel, publishMessage } = require('../../utils/messageQueue');
const {createChannel, publishMessage} = require('../utils/messageQueue')

const { REMINDER_BINDING_KEY } = require('../config/serverConfig')
const bookingService = new BookingService();


class BookingController{

    // constructor(channel){
    //     this.channel = channel;
    // }

    async sendMessageToQueue(req, res){
        const channel = await createChannel();
        const payload = {
            data : {
                subject : 'this is a noti from queue',
                content : 'Some queue will subscribe this',
                recepientEmail : 'vinit.jogi@somaiya.edu',
                notificationTime : '2023-10-17T17:00:00'
            },
            service : 'CREATE_TICKIT'
        }
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));

        return res.status(200).json({
            message : 'successfully published the event'
        })

    }


    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            // console.log('Booking controller', response);
            return res.status(StatusCodes.OK).json({
                message : 'Successfully completed booking',
                success : true,
                err : {},
                data : response,
            });
        } catch (error) {
            return res.status(error.statusCode).json({
                message : error.message,
                success : false,
                err : error.explanation,
                data : {}
            });
        }
    }
}



module.exports = BookingController;