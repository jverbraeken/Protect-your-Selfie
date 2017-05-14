"use strict"

const AWS = require('aws-sdk');
const crypto = require('crypto');


let s3 = new AWS.S3({apiVersion: '2006-03-01'});


module.exports.upload = function(filename, body) {
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

module.exports.download = function(filename) {
	return new Promise((resolve, reject) => {
		let params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: filename
		};

		s3.getObject(params, (err, res) => err ? reject(err) : resolve(res.Body));
	});
};
