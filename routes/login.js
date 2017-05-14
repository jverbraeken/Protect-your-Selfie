"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// router.post('/login', function(req, res) {
//     let username = req.body.username,
//         password = req.body.password;
//     console.log(username, password);
//
//     res.redirect('/dashboard');
// });
router.post('/login', passport.authenticate('local', function(err, user, info) {
	if(user) {
		req.logIn(user, function(err) {
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
