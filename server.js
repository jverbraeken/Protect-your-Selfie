"use strict";


const express = require('express');
var key_generator = require('./keys.js')


// Initialize an express app
const app = express();
module.exports = app;


// Set static source for express
app.use(express.static(process.cwd() + '/public'));
app.use('/', require('./routes/bundle.js'));

app.get('/keys', function(req, res) {
	res.send(key_generator.decrypt(key_generator.encrypt("test", "bliepebloep"), "bliepebloep"));
});

app.get('/generate_key', function(req, res) {
	key_generator.generate_key().then(function(key) { res.send(key); });
});

app.get('/dashboard', function(req, res) {
	res.sendFile('dashboard.html', {root:'./public'});
});

// Start the server
app.listen(process.env.PORT, function(err) {
	if(err) {
		console.warn('SERVER DID NOT START:', err);
	} else {
		console.log('Node app is running in', process.env.ENVIRONMENT, 'mode on port:', process.env.PORT);
	}
});

const db = require('./database/db.js');
db.connect();
