//const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 255,
		required: true
	},
	email: {
		type: String,
		minlength: 5,
		maxlength: 255,
		unique: true,
		required: true
	},
	password: {
		type: String,
		minlength: 5,
		maxlength: 1024,
		required: true
	}
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email
		}, 
		//config.get('jwtPrivateKey')
		process.env.API_JWT_PRIVATE_KEY
	);
	return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.required(),
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()	
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;