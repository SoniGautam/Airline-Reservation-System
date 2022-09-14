const Joi = require('joi');
const bcrypt = require('bcrypt');
const{ User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get("/",  async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World\n');
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	let user = await User.findOne({email: req.body.email});
	if (!user)
		return res.status(400).send("Invalid username or password");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		return res.status(400).send("Invalid username or password");

	const token = user.generateAuthToken();
	res.send(token);
});

function validate(req) {
	const schema = {
		email: Joi.string().min(5).max(255).email().required(),
		password: Joi.string().min(5).max(255).required()
	};

	return Joi.validate(req, schema);
}

module.exports = router;
