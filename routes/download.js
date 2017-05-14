"use strict";

const aws = require('../database/aws.js');
const express = require('express');

let router = express.Router();


router.get('/download', function(req, res) {
	let file_id = req.query.id;
	aws.getFile(file_id, "eric", "mysecret")
		.then(file => {
			res.setHeader('Content-disposition', 'attachment; filename=' + file.name);
			res.setHeader('Content-type', 'text/plain');
			res.charset = 'UTF-8';
			res.write(file.content);
			res.end();
		})
		.then(() => res.status(200).end())
		.catch(() => res.status(418).end());
});


module.exports = router;
