"use strict";

const express = require('express');
const passport = require('passport');
const auth = require('../auth.js');

let router = express.Router();

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if(user) {
			req.logIn(user, function(err) {
				if(err) {
					console.error('session failed', err);
					return res.redirect('/');
				}

				if(user.is_organization) {
					res.redirect('/odashboard');
				} else {
					res.redirect('/dashboard')
				}
			});
		} else {
			res.redirect('/');
		}
	})(req, res, next);
});

router.get('/logout', function(req, res) {
	if(req.user) {
		console.warn('no active session while trying to log out');
	} else {
		log.unauthorizedRequest(req);
	}

	req.logout();
	res.redirect('/');
});


module.exports = router;
