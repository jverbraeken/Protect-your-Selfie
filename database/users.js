"use strict";

const db = require('./db.js');

const GET_USER = "SELECT * FROM users WHERE username = $1"

module.exports.authenticateUser = function(username, password) {
  let postgres = db.get();
  return new Promise((resolve, reject) => {
    postgres.query(GET_USER, [username], function(err, res) {
      if(err) {
        console.error(err);
        return reject();
      }

      let user = res.rows[0];
      if(user === undefined) {
        console.warn('unknown user');
        return reject();
      }

      if(user.password === password) {
        console.log('correct password');
        return resolve();
      } else {
        console.warn('incorrect password');
        return reject();
      }
    });
  });
};
