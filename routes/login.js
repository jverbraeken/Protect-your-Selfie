"use strict";

//const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const auth = require('../auth.js');

let router = express.Router();
//router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log('hoi', user, info);
		if(user) {
			res.redirect('/dashboard');
		} else {
			res.redirect('/');
		}
	})(req, res, next);
});


module.exports = router;
