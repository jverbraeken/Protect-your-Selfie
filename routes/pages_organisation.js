"use strict";

const express = require('express');

let router = express.Router();


router.get('/odashboard', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('dashboard.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/odocuments', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('documents.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/ouploading', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('upload.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/ouser', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('user.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/oviewer', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('viewer.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/oclientList', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('clientList.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});

router.get('/oclientProfile', function(req, res) {
	if(req.user && req.user.is_organization) {
		res.sendFile('clientProfile.html', {root:'./public/organization'});
	} else {
		res.sendFile('index.html', {root:'./public'});
	}
});


module.exports = router;
