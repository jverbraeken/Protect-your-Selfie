"use strict";

const aws = require('../database/aws.js');
const express = require('express');
const fileUpload = require('express-fileupload');


let router = express.Router();
router.use(fileUpload());


router.post('/upload', function(req, res) {
    let filename = req.files.theFile.name,
        filecontent = req.files.theFile.data.toString();

    aws.createFile(filename, filecontent, req.user.username, 'mysecret')
        .then(() => res.redirect('/documents?success=yes&docname=' + filename))
        .catch(e => {
            res.redirect('/documents?success=no&docname=' + req.files.theFile.name);
        });
});

module.exports = router;
