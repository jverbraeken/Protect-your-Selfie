"use strict";

const express = require('express');

let router = express.Router();

router.use('/', require('./download.js'));
router.use('/', require('./upload.js'));

module.exports = router;
