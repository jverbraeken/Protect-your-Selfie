"use strict";

const db = require('./db.js');
const key_generator = require('../keys.js');
const crypto = require('crypto');

let hash = crypto.createHash('sha256');

const INSERT_FILE_QUERY = "INSERT INTO files(file_name, amazon_file) VALUES ($1, $2) RETURNING id";
const INSERT_RELATION = "INSERT INTO relations VALUES ($1, $2, $3, $4)";
const GET_USER_QUERY = "SELECT * FROM users WHERE username = $1";

module.exports = {
    createFile: function(filename, filecontent, username, secret) {
        let postgres = db.get();
        return new Promise((resolve, reject) => {
            let hash = crypto.createHash('sha256');
            hash.update(username + filename);

            key_generator.generate_key().then(key => {
                let new_filename = hash.digest('hex');
                let filecontentnew = key_generator.encrypt(filecontent, key);
                let nonsense = key_generator.encrypt(key, secret);

                postgres.query(INSERT_FILE_QUERY, [filename, new_filename], function(err, res) {
                    if(err) {
                        console.error(err);
                        return reject();
                    }

                    let file_id = res.rows[0].id;
                    postgres.query(GET_USER_QUERY, [username], function(err, res) {
                        if(err) {
                            console.error(err);
                            return reject();
                        }

                        let user_id = res.rows[0].id;
                        postgres.query(INSERT_RELATION, [user_id, user_id, nonsense, file_id], function(err, res) {
                            if(err) {
                                console.error(err);
                                return reject();
                            }

                            resolve();
                        });
                    });
                });
            });
        });
    },

  get_files: function(username_in, password_in) {
    return new Promise((resolve, reject) => {
      const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
      query1.on('row', (row) => {
        if (row.password === password_in) {
          const results = [];
          const query2 = db.get().query("SELECT file_name FROM files WHERE id IN (SELECT associated_file FROM relations WHERE granted_user = $1)", [row.id]);
          query2.on('row', (row2) => {
            results.push(row);
          });
          query2.on('end', () => {
            resolve(results);
          });
        } else {
          // OOPS
        }
      });
    });
  },

  get_file : function(username_in, password_in, nonsense, secret, file) {
    return new Promise((resolve, reject) => {
      const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
      query1.on('row', (row) => {
        if (row.password === password_in) {
          const decrypted_key = key_generator.decrypt(nonsense, secret);
          console.log("1");
          const query2 = db.get().query("SELECT amazon_file FROM files WHERE file_name = $1", [file]);
          resolve("replace this by the amazon file");
        }
      });
    });
  }
}
