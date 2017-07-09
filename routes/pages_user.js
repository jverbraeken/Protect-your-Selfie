"use strict";

const express = require('express');

let router = express.Router();


router.get('/dashboard', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('dashboard.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/documents', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('documents.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/uploading', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('upload.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/user_details', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('user.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/viewer', function(req, res) {
	if(req.user && !req.user.is_organization) {
		res.sendFile('viewer.html', {root:'./public/user'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});


module.exports = router;
