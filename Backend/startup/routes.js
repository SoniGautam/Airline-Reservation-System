const express = require('express');
const error = require('../middleware/error');

const users = require('../routes/users');
const auth = require('../routes/auth');
const bookings = require('../routes/bookings');


module.exports = function(app) {
	app.use(express.json());
	app.use('/api/users', users);
 	app.use('/api/auth', auth);
	app.use('/api/bookings', bookings);
	app.use(error);
}