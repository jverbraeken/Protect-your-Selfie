"use strict";

const db = require('./db.js');
const keys = require("../keys.js");

const GET_USER_OWN_FILES = "SELECT id, file_name, amazon_file, description, date_uploaded FROM files WHERE id IN (SELECT associated_file FROM user_to_file WHERE file_owner = $1)"
const GET_USER_OTHER_FILES = "SELECT id, file_name AS name, description, RIGHT(file_name, 3) AS type, date_uploaded AS timestamp FROM files WHERE id IN (SELECT associated_file FROM user_to_file WHERE granted_user = $1)"
const ADD_NEW_VIEW = "INSERT INTO views(file, viewed_by, date_viewed) VALUES ($1, $2, $3)";
const GET_FILE = "SELECT amazon_file FROM files WHERE file_name = $1";
const GET_ALL_USERS = "SELECT id, name FROM users";
const EVOKE_ALL_USERS_FROM_FILE = "DELETE FROM user_to_file WHERE file_owner = $1 AND associated_file = $2 AND granted_user != $1";
const GRANT_USER_TO_FILE = "INSERT INTO user_to_file(file_owner, granted_user, associated_file, nonsense) VALUES ($1, $2, $3, $4)";
const GET_NONSENSE = "SELECT nonsense FROM user_to_file WHERE file_owner = $1 AND associated_file = $2";
const GET_ORGANIZATIONS_OF_USER = "SELECT id, name FROM users WHERE id IN (SELECT organization_id FROM user_to_organization WHERE user_id = $1)";
const GET_USERS_OF_ORGANIZATION = "SELECT id, name FROM users WHERE id IN (SELECT user_id FROM user_to_organization WHERE organization_id = $1)";
const GET_RECENTLY_VIEWED_FILES = "SELECT ROW_NUMBER() OVER (ORDER BY views.date_viewed) AS number, user AS institution, description, RIGHT(file_name, 3) AS type, date_uploaded AS timestamp FROM views JOIN files ON views.file = files.id JOIN user_to_file ON user_to_file.associated_file = files.id WHERE file_owner = $1";


module.exports.getUserOwnFiles = function(id) {
  let postgres = db.get();
  return new Promise((resolve, reject) => {
    postgres.query(GET_USER_OWN_FILES, [id], function(err, res) {
      if(err) {
        console.error(err);
        return reject();
      }

      let files = res.rows.map(file => ({id: file.id, name: file.file_name, amazon: file.amazon_file, description: file.description, date: file.date_uploaded}));
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

      let files = res.rows.map(file => ({id: file.id, name: file.name, description: file.description, type: file.type, timestamp: file.timestamp}));
      resolve(files);
    });
  });
};

module.exports.new_user = function(name_in, username_in, password_in) {
  return new Promise((resolve, reject) => {
    db.get().query("INSERT INTO users(name, username, password) VALUES ($1, $2, $3)", [name_in, username_in, password_in], function(err, res) {
      if (err) {
        console.error(err);
        return reject();
      }

      return resolve(res);
    });
  });
}

module.exports.getAllUsers = function() {
  return new Promise((resolve, reject) => {
    db.get().query(GET_ALL_USERS, [], function(err, res) {
      if (err) {
        console.error(err);
        return reject();
      }

      let users = res.rows.map(user => ({id: user.id, name: user.name}));
      resolve(users);
    });
  });
}

module.exports.grantUsersToFile = function(user_id, file_id, granted_user_ids, secret) {
  return new Promise((resolve, reject) => {
    db.get().query(EVOKE_ALL_USERS_FROM_FILE, [user_id, file_id], function(err, res) {
      if (err) {
        console.error(err);
        return reject();
      }
      db.get().query(GET_NONSENSE, [user_id, file_id], function(err, res) {
        if (err) {
          console.error(err);
          return reject();
        }
        const nonsense = "asdf";//res.rows[0];
        const key = keys.decrypt(nonsense, secret);
        granted_user_ids[0].forEach(granted_user_id => {
          const new_nonsense = keys.encrypt(key, secret);
          db.get().query(GRANT_USER_TO_FILE, [user_id, granted_user_id, file_id, new_nonsense]);
        });
      });
    });
  });
}

module.exports.getOrganizationsOfUser = function(user_id) {
  return new Promise((resolve, reject) => {
    db.get().query(GET_ORGANIZATIONS_OF_USER, [user_id], function(err, res) {
      if (err) {
        console.error(err);
        return reject();
      }

      let organizations = res.rows.map(organization => ({id: organization.id, name: organization.name}));
      resolve(organizations);
    });
  });
}

module.exports.getUsersOfOrganization = function(organization_id) {
  return new Promise((resolve, reject) => {
    db.get().query(GET_USERS_OF_ORGANIZATION, [organization_id], function(err, res) {
      if (err) {
        console.error(err);
        return reject();
      }

      let users = res.rows.map(user => ({id: user.id, name: user.name}));
      resolve(users);
    });
  });
}

module.exports.getRecentlyViewedFiles = function(user_id) {
  return new Promise((resolve, reject) => {
    db.get().query(GET_RECENTLY_VIEWED_FILES, [user_id], function(err, res) {
      if (err) {
        console.error(err);
        return reject();
      }

      let files = res.rows.map(file => ({number: file.number, institution: file.institution,
      description: file.description, type: file.type, timestamp: file.timestamp}));
      resolve(files);
    });
  });
}
