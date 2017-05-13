"use strict";


const express = require('express');


// Initialize an express app
const app = express();
module.exports = app;


// Set static source for express
app.use(express.static(process.cwd() + '/public'));


// Start the server
app.listen(process.env.port, function(err) {
	if(err) {
		console.warn('SERVER DID NOT START:', err);
	} else {
		console.log('Node app is running in', process.env.environment, 'mode on port:', process.env.port);
	}
});


// Initialize the database
const db = require('./database/db.js');
db.connect();
