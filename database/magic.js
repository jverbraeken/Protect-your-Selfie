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
    }
}
