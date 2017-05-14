"use strict";


const express = require('express');
const key_generator = require('./keys.js');
const magic = require('./database/magic.js');
const db = require('./database/db.js');
db.connect();


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

app.get('/new_file', function(req, res) {
	magic.new_file("joost", "key_to_encrypt", "secret", "file")
		.then(() => res.status(200).end())
		.catch(() => res.status(418).end());
})

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
