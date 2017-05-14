"use strict";

const db = require('./db.js');
const key_generator = require('../keys.js');
const crypto = require('crypto');

let hash = crypto.createHash('sha256');

module.exports = {
  new_file : function(username_in, password_in, key_to_encrypt, secret, file) {
    return new Promise((resolve, reject) => {
      const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
      query1.on('row', (row) => {
        console.log("hoi5");
        if (row.password === password_in) {
          console.log("hoi");
          let postgres = db.get();
          let hash = crypto.createHash('sha256');

          hash.update(username_in + file);

          const nonsense = key_generator.encrypt(key_to_encrypt, secret);
          postgres.query("INSERT INTO files(file_name, amazon_file, description, date_uploaded) VALUES ($1, $2, $3, $4) RETURNING id", ['filename', hash.digest('hex'), 'description', new Date()], function(err, result) {
            if(err) {
              console.log("hoi3");
                reject();
            } else {
              console.log("hoi2");
                postgres.query("SELECT * FROM users WHERE username = 'joost'").on('row', (row) => {
                    postgres.query("INSERT INTO relations VALUES ($1, $2, $3, $4)", [row.id, row.id, nonsense, result.rows[0].id]);
                    resolve();
                });
            }
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
          const query2 = db.get().query("SELECT * FROM files WHERE id IN (SELECT associated_file FROM relations WHERE granted_user = $1)", [row.id]);
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
          db.get().query("INSERT INTO views(file, viewed_by, date_viewed) VALUES ($1, $2, $3)", [file, row.id, new Date()]);
          const decrypted_key = key_generator.decrypt(nonsense, secret);
          console.log("1");
          const query2 = db.get().query("SELECT amazon_file FROM files WHERE file_name = $1", [file]);
          resolve("replace this by the amazon file");
        }
      });
    });
  },

  new_user : function(username_in, password_in) {
    db.get().query("INSERT INTO users(username, password) VALUES ($1, $2)", [username_in, password_in]);
  }
}
