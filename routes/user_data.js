"use strict";

const query = require('../database/query.js');
const express = require('express');

let router = express.Router();


router.get('/get_files', function(req, res) {
	query.getUserOwnFiles(req.query.id);
});


module.exports = router;
