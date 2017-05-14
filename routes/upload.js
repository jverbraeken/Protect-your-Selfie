"use strict";

const express = require('express');
const aws = require('../database/aws-files.js');

let router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/uploadx', function(req, res) {
  aws.upload(req.files.theFile.name, req.files.theFile.data)
	.then(url => console.log(url))
	.then(() => res.redirect('/documents.html?success=yes&docname=' + req.files.theFile.name))
	.catch(e => {
		res.redirect('/documents.html?success=no&docname=' + req.files.theFile.name);
	});
});

module.exports = router;
