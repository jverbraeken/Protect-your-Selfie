"use strict"

const AWS = require('aws-sdk');
const crypto = require('crypto');


let s3 = new AWS.S3({apiVersion: '2006-03-01'});


module.exports = function() {
	return new Promise((resolve, reject) => {
		let params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: 'testd.txt',
			Body: 'test\n',
			ACL: 'authenticated-read'
		};

		s3.upload(params, (err, res) => err ? reject(err) : resolve(res));
	});
};
