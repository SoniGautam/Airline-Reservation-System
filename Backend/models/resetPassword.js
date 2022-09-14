const Joi = require('joi');
const mongoose = require('mongoose');


const ResetPassword = mongoose.model('ResetPassword', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: true
    },
    expire: {
        type: Date,
        required: true
    }    
}));


exports.ResetPassword = ResetPassword; 
