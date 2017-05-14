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


// Simple routes
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

app.get('/dashboard', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('dashboard.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/documents', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('documents.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/uploading', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('upload.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/userx', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('user.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/viewer', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('viewer.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/viewero', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('viewer.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

app.get('/Odashboard', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('dashboard.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/Odocuments', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('documents.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/Ouploading', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('upload.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/Ouserx', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('user.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});
app.get('/Oviewer', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('viewer.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
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
