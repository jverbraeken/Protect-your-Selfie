"use strict";

const express = require('express');
const magic = require('../database/magic.js');


let router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());


router.post('/upload', function(req, res) {
    let filename = req.files.theFile.name,
        filecontent = req.files.theFile.data.toString();
    magic.createFile(filename, filecontent, 'eric', 'mysecret')
        .then(() => res.redirect('/documents.html?success=yes&docname=' + filename))
        .catch(e => {
            res.redirect('/documents.html?success=no&docname=' + req.files.theFile.name);
        });
});

module.exports = router;
