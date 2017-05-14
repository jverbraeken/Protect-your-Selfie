"use strict";

const express = require('express');
const passport = require('passport');
const auth = require('../auth.js');

let router = express.Router();

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if(user) {
			if(user.is_organization) {
				res.redirect('/odashboard');
			} else {
				res.redirect('/dashboard')
			}
		} else {
			res.redirect('/');
		}
	})(req, res, next);
});


module.exports = router;
