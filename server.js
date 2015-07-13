#!/usr/bin/env node

/*global require, process*/

var express = require('express');
var fs = require('fs');
var safe = require('safetydance');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json({ strict: true }));

var file = process.env.CLOUDRON === '1' ? '/app/data/passwords.json' : 'passwords.json';
app.get('/passwords.json', function(req, res) {
    var passwords = safe.JSON.parse(safe.fs.readFileSync(file, 'utf8'));
    res.send(passwords || []);
});
app.post('/passwords.json', function(req, res) {
    if (safe.fs.writeFileSync(file, JSON.stringify(req.body.passwords, undefined, 4))) {
        res.status(200).end();
    } else {
        res.status(500).end("Failed to write passwords: " + safe.error.message, "utf8");
    }
});
app.use(express.static("."));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://localhost:%s', port);
});
