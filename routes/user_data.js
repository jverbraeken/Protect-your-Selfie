"use strict";

const query = require('../database/query.js');
const express = require('express');

let router = express.Router();


router.get('/getOwnFiles', function(req, res) {
	query.getUserOwnFiles(req.query.id);
});

router.get('/getOtherFiles', function(req, res) {
	query.getUserOtherFiles(req.query.id);
});


module.exports = router;
