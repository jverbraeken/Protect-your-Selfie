"use strict";


const express = require('express');


// Initialize an express app
const app = express();
module.exports = app;


// Set static source for express
app.use(express.static(process.cwd() + '/public'));


// Example upload file
const aws = require('./database/aws-files.js');
app.get('/upload', function(req, res) {
	aws('test.txt', 'Hello world!')
		.then(url => console.log(url))
		.then(() => res.status(200).end('Success!'))
		.catch(e => {
			res.status(418).end('Failed!');
		});
})



// Start the server
app.listen(process.env.PORT, function(err) {
	if(err) {
		console.warn('SERVER DID NOT START:', err);
	} else {
		console.log('Node app is running in', process.env.ENVIRONMENT, 'mode on port:', process.env.PORT);
	}
});


// Initialize the database
const db = require('./database/db.js');
db.connect();
