"use strict";

const db = require('./db.js');
const key_generator = require('../keys.js');
const crypto = require('crypto');
const AWS = require('aws-sdk');

const INSERT_FILE_QUERY = "INSERT INTO files(file_name, amazon_file) VALUES ($1, $2) RETURNING id";
const INSERT_USERTOFILE = "INSERT INTO user_to_file VALUES ($1, $2, $3, $4)";
const INSERT_VIEWED = "INSERT INTO views(file, viewed_by, date_viewed) VALUES ($1, $2, $3)";
const GET_FILE_QUERY = "SELECT * FROM files WHERE id = $1";
const GET_USER_QUERY = "SELECT * FROM users WHERE username = $1";
const GET_NONSENSE = "SELECT * FROM user_to_file WHERE granted_user = $1 AND associated_file = $2";

let hash = crypto.createHash('sha256');
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

let upload = function(filename, body) {
	return new Promise((resolve, reject) => {
		let params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: filename,
			Body: body,
			ACL: 'authenticated-read'
		};

		s3.upload(params, (err, res) => err ? reject(err) : resolve(res.Location));
	});
};
let download = function(filename) {
	return new Promise((resolve, reject) => {
		let params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: filename
		};

		s3.getObject(params, (err, res) => err ? reject(err) : resolve(res.Body.toString()));
	});
};

module.exports = {
    createFile: function(filename, filecontent, username, secret) {
        let postgres = db.get();
        return new Promise((resolve, reject) => {
            let hash = crypto.createHash('sha256');
            hash.update(username + filename + new Date().toString());

            key_generator.generate_key().then(key => {
                let new_filename = hash.digest('hex');
                let new_filecontent = key_generator.encrypt(filecontent, key);
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
                        postgres.query(INSERT_USERTOFILE, [user_id, user_id, file_id, nonsense], function(err, res) {
                            if(err) {
                                console.error(err);
                                return reject();
                            }

                            upload(new_filename, new_filecontent).then(resolve).catch(reject);
                        });
                    });
                });
            });
        });
    },

    getFile: function(file_id, user_id, secret) {
        let postgres = db.get();
        return new Promise((resolve, reject) => {
            postgres.query(INSERT_VIEWED, [file_id, user_id, new Date()]);
            postgres.query(GET_FILE_QUERY, [file_id], function(err, res) {
                if(err) {
                    console.error(err);
                    return reject();
                }

                let amazon_file = res.rows[0].amazon_file;
                let file_name = res.rows[0].file_name;
                postgres.query(GET_NONSENSE, [user_id, file_id], function(err, res) {
                    if(err) {
                        console.error(err);
                        return reject();
                    }

                    let nonsense = res.rows[0].nonsense;
                    let key = key_generator.decrypt(nonsense, secret);
                    download(amazon_file)
                        .then(file_content => key_generator.decrypt(file_content, key))
                        .then(file_content => resolve({name: file_name, content: file_content}))
                        .catch(reject);
                });
            });
        });
    }
}
