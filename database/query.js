"use strict";

const db = require('./db.js');

const GET_USER_OWN_FILES = "SELECT id, file_name FROM files WHERE id IN (SELECT associated_file FROM user_to_file WHERE file_owner = $1)"

module.exports.getUserOwnFiles = function(id) {
    let postgres = db.get();
    return new Promise((resolve, reject) => {
        postgres.query(GET_USER_OWN_FILES, [id], function(err, res) {
            if(err) {
                console.error(err);
                return reject();
            }

            let files = res.rows.map(file => ({id: file.id, name: file.file_name}));
            resolve(files);
        });
    });
};
