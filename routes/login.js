"use strict";

const express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', function(req, res) {
    let username = req.body.username,
        password = req.body.password;
    console.log(username, password);

    res.redirect('/dashboard');
});


module.exports = router;
