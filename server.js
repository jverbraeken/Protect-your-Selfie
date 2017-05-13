"use strict";


const express = require('express');
var key_generator = require('./keys.js')


// Initialize an express app
const app = express();
module.exports = app;


// Set static source for express
//app.use(express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.send(key_generator.decrypt(key_generator.encrypt("test", "bliepebloep"), "bliepebloep"));
})

// Start the server
app.listen(process.env.port, function(err) {
	if(err) {
		console.warn('SERVER DID NOT START:', err);
	} else {
		console.log('Node app is running in', process.env.environment, 'mode on port:', process.env.port);
		console.log(key_generator.encrypt("test", "bliepebloep"));
	}
});
