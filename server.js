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

app.get('/new_file', function(req, rs) {
	magic.new_file("joost", "key_to_encrypt", "secret", "file");
});

app.get('/dashboard', function(req, res) {
	res.sendFile('dashboard.html', {root:'./public'});
});

app.get('/get_files', function(req, res) {
	magic.get_files("joost", "password");
});

// Start the server
console.log(process.env.PORT);
app.listen(process.env.PORT, function(err) {
	if(err) {
		console.warn('SERVER DID NOT START:', err);
	} else {
		console.log('Node app is running in', process.env.ENVIRONMENT, 'mode on port:', process.env.PORT);
		console.log(key_generator.encrypt("test", "bliepebloep"));
	}
});
