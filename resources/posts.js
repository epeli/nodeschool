

var express = require("express");

var db = require("../db");
var app = express.Router();

app.get("/api/posts", function(req, res, next) {
    res.status(501).end(); // TODO
});

app.post("/api/posts", function(req, res, next) {
    res.status(501).end(); // TODO
});

app.get("/api/posts/:id", function(req, res, next) {
    res.status(501).end(); // TODO
});

module.exports = app;
