"use strict";

const express = require('express');
const db = require('./database/db.js');
const query = require('./database/query.js');
db.connect();


// Initialize an express app
const app = express();
module.exports = app;


// Set static source for express
app.use(express.static(process.cwd() + '/public'));
app.use('/', require('./routes/bundle.js'));


// Simple routes
app.get('/dashboard', function(req, res) {
	res.sendFile('dashboard.html', {root:'./public/user'});
});
app.get('/documents', function(req, res) {
	res.sendFile('documents.html', {root:'./public/user'});
});
app.get('/uploading', function(req, res) {
	res.sendFile('upload.html', {root:'./public/user'});
});
app.get('/userx', function(req, res) {
	console.log("hier");
	res.sendFile('user.html', {root:'./public/user'});
});
app.get('/viewer', function(req, res) {
	res.sendFile('viewer.html', {root:'./public/user'});
});
app.get('/viewero', function(req, res) {
	res.sendFile('viewer.html', {root:'./public/organization'});
});

app.get('/new_user', function(req, res) {
	query.new_user(req.query.username, req.query.password)
		.then(() => res.status(200).end())
		.catch(() => res.status(418).end());
});

// Start the server
app.listen(process.env.PORT, function(err) {
	if(err) {
		console.warn('SERVER DID NOT START:', err);
	} else {
		console.log('Node app is running in', process.env.ENVIRONMENT, 'mode on port:', process.env.PORT);
	}
});
