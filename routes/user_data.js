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

router.get('/getAllUsers', function(req, res) {
  query.getAllUsers();
});

router.post('/grantUsersToFile', function(req, res) {
  query.grantUsersToFile(req.query.user_id, req.query.file_id, req.query.granted_user_ids, "remove this");
});

router.get('/getRecentlyViewedFiles', function(req, res) {
  query.getRecentlyViewedFiles(req.query.user_id).then(data => res.status(200).end(JSON.stringify(data)));
});


module.exports = router;
