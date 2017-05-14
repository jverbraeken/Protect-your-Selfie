"use strict";

const db = require('./db.js');
const key_generator = require('../keys.js');
const crypto = require('crypto');

let hash = crypto.createHash('sha256');

module.exports = {
    new_file: function(username_in, key_to_encrypt, secret, file) {
        return new Promise((resolve, reject) => {
            let postgres = db.get();
            let hash = crypto.createHash('sha256');

            hash.update(username_in + file);

            let nonsense = key_generator.encrypt(key_to_encrypt, secret);
            postgres.query("INSERT INTO files(file_name, amazon_file) VALUES ($1, $2) RETURNING id", ['filename', hash.digest('hex')], function(err, result) {
                if(err) {
                    reject();
                } else {
                    postgres.query("SELECT * FROM users WHERE username = 'joost'").on('row', (row) => {
                        postgres.query("INSERT INTO relations VALUES ($1, $2, $3, $4)", [row.id, row.id, nonsense, result.rows[0].id]);
                        resolve();
                    });
                }
            });
        });
    },

  get_files: function(username_in, password_in) {
    return new Promise((resolve, reject) => {
      const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
      query1.on('row', (row) => {
        if (row.password === password_in) {
          const results = [];
          const query2 = db.get().query("SELECT file_name FROM files WHERE id IN (SELECT associated_file FROM relations WHERE granted_user = $1)", [username_in]);
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
  }
}