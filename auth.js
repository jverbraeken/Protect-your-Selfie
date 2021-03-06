"use strict";

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const db = require('./database/users.js');


passport.use(
	new LocalStrategy(function(username, password, done) {
    db.authenticateUser(username, password)
      .then(user => done(null, user, 'success'))
      .catch(e => {
				console.log(e);
				done(undefined, false, {});
			});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
