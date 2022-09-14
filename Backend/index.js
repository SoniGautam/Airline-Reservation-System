//const winston = require("winston");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require('dotenv').config();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/production")(app);


const hostname = '0.0.0.0';
const port = process.env.API_PORT || 5000 /*|| config.get("port")*/;


const server = app.listen(port, hostname, () =>
	console.log(`Listening on port ${port}...`)
);


module.exports = server;
