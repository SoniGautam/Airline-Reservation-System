const Joi = require('joi');
const mongoose = require('mongoose');


const Bookings = mongoose.model('Bookings', new mongoose.Schema({
    date: {
        type: String
    },
    flightDate: {
        type: Date,
    },
    dest1: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    dest2: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    seats: {
        type: Number,
        required: true,
        default: 1
    },
    remarks: {
        type: String,
        maxlength: 1024
    }    
}));


function validateBookings(booking) {
    const schema = {
        date: Joi.string().allow(''),
        flightDate: Joi.date().required(),
        dest1: Joi.string().min(2).max(255).required(),
        dest2: Joi.string().min(2).max(255).required(),
        seats: Joi.number().required(),
        remarks: Joi.string().max(1024).allow('')
    };

    return Joi.validate(booking, schema);
}

exports.Bookings = Bookings; 
exports.validateBookings = validateBookings;