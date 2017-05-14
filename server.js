"use strict";

const express = require('express');
const db = require('./database/db.js');
const passport = require('passport');
const query = require('./database/query.js');
const session = require('express-session');
db.connect();


// Initialize an express app
const app = express();
module.exports = app;


// Set static source for express
app.use(express.static(process.cwd() + '/public'));
app.use('/', require('./routes/bundle.js'));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "kappa"
}));
app.use(passport.initialize());
app.use(passport.session());


// Simple routes
app.get('/', function(req, res) {
	res.sendFile('login.html', {root:'./public'});
});
app.get('/dashboard', function(req, res) {
	res.sendFile('dashboard.html', {root:'./public'});
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
