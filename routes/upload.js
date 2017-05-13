"use strict";

const express = require('express');
const aws = require('../database/aws-files.js');

let router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.get('/upload/:file/:data', function(req, res) {
	aws.upload(req.params.file, req.params.data)
		.then(url => console.log(url))
		.then(() => res.status(200).end('Success!'))
		.catch(e => {
			res.status(418).end('Failed!');
		});
});

router.post('/uploadx', function(req, res) {
  console.log(req.files); // the uploaded file object 
});

module.exports = router;
