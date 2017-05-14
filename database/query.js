"use strict";

const db = require('./db.js');

const GET_USER_OWN_FILES = "SELECT id, file_name, amazon_file, description, date_uploaded FROM files WHERE id IN (SELECT associated_file FROM user_to_file WHERE file_owner = $1)"
const GET_USER_OTHER_FILES = "SELECT id, file_name, amazon_file, description, date_uploaded FROM files WHERE id IN (SELECT associated_file FROM user_to_file WHERE granted_user = $1)"
const ADD_NEW_VIEW = "INSERT INTO views(file, viewed_by, date_viewed) VALUES ($1, $2, $3)";
const GET_FILE = "SELECT amazon_file FROM files WHERE file_name = $1";

module.exports.getUserOwnFiles = function(id) {
  let postgres = db.get();
  return new Promise((resolve, reject) => {
    postgres.query(GET_USER_OWN_FILES, [id], function(err, res) {
      if(err) {
        console.error(err);
        return reject();
      }

      let files = res.rows.map(file => ({id: file.id, name: file.file_name, amazon: file.amazon_file, description: file.description, date: date_uploaded}));
      resolve(files);
    });
  });
};

module.exports.getUserOtherFiles = function(id) {
  let postgres = db.get();
  return new Promise((resolve, reject) => {
    postgres.query(GET_USER_OTHER_FILES, [id], function(err, res) {
      if(err) {
        console.error(err);
        return reject();
      }

      let files = res.rows.map(file => ({id: file.id, name: file.file_name, amazon: file.amazon_file, description: file.description, date: date_uploaded}));
      resolve(files);
    });
  });
};

module.exports.new_user = function(username_in, password_in) {
  return new Promise((resolve, reject) => {
    db.get().query("INSERT INTO users(username, password) VALUES ($1, $2)", [username_in, password_in], function(err, res) {
      if (err) {
        console.error(err);
        return reject();
      }

      return resolve(res);
    });
  });
}
