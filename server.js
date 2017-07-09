"use strict";

const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "kappa"
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/bundle.js'));


// Home route
app.get('/', function(req, res) {
	if(req.user) {
		if(user.is_organization) {
			res.redirect('/odashboard');
		} else {
			res.redirect('/dashboard')
		}
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});


// Start the server
app.listen(process.env.PORT, function(err) {
	if(err) {
		console.warn('SERVER DID NOT START:', err);
	} else {
		console.log('Node app is running in', process.env.ENVIRONMENT, 'mode on port:', process.env.PORT);
	}
});
