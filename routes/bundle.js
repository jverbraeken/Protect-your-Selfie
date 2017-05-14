"use strict";

const express = require('express');

let router = express.Router();

router.use('/', require('./login.js'));
router.use('/', require('./download.js'));
router.use('/', require('./upload.js'));
router.use('/', require('./user_data.js'));

module.exports = router;
