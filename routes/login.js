"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', passport.authenticate('local', function(err, user, info) {
	if(user) {
		req.logIn(user, function(err) {
			console.log(err, user, info);
			if(err) {
				return;
			}

			res.redirect('/dashboard');
		});
	} else {
		res.redirect('/login');
	}
}));


module.exports = router;
