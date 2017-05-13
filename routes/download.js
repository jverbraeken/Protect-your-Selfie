"use strict";

const express = require('express');
const aws = require('../database/aws-files.js');

let router = express.Router();


router.get('/download/:file', function(req, res) {
	aws.download(req.params.file)
		.then(file => {
			res.setHeader('Content-disposition', 'attachment; filename=download.txt');
			res.setHeader('Content-type', 'text/plain');
			res.charset = 'UTF-8';
			res.write(file).end();
		})
		.catch(e => {
			res.status(418).end('Failed!');
		});
});


module.exports = router;
