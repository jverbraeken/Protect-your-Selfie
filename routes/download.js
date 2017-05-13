"use strict";

const express = require('express');
const aws = require('../database/aws-files.js');

let router = express.Router();


router.get('/download/:file', function(req, res) {
	aws.download(req.params.file)
		.then(file => {
			console.log(file);
			return file;
		})
		.then(file => res.status(200).send(file))
		.catch(e => {
			res.status(418).end('Failed!');
		});
});


module.exports = router;
