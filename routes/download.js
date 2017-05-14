"use strict";

const express = require('express');
const magic = require('../database/magic.js');

let router = express.Router();


router.get('/download/:file', function(req, res) {
	let filename = req.params.file;
	magic.getFile(filename, "eric", "mysecret")
		.then(content => {
			res.setHeader('Content-disposition', 'attachment; filename=' + filename);
			res.setHeader('Content-type', 'text/plain');
			res.charset = 'UTF-8';
			res.write(content);
			res.end();
		})
		.then(() => res.status(200).end())
		.catch(() => res.status(418).end());
});


module.exports = router;
