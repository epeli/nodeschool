
var express = require("express");
var path = require("path");

var db = require("../db");
var app = express.Router();

var auth = require('basic-auth');

app.use(function setUserFromSession(req, res, next) {
    db.get("user:" + req.session.loggedInUser, function(err, user){
        if (err) return next(err);
        req.user = user;
        next();
    });
});

app.use(function setUserFromBasicAuth(req, res, next) {
 
  var credentials = auth(req);
//debugger;
  db.get('user:'+credentials.name, function(err, user){
        if (err) return next(err);
        debugger;
        if (user.password !== credentials.pass) {
            res.status(401);
            return res.json({ error: "bad password" });
        }


        req.user = user;
        next();
    });
});

app.get("/login", function(req, res) {
    res.sendfile(path.resolve(__dirname, "..",  "public/login.html"));
});


app.post("/login", function(req, res, next) {
    db.get("user:" + req.body.username, function(err, user) {
        if (!user) return res.status(404).end("no such user");

        if (user.password !== req.body.password) {
            res.status(401);
            return res.json({ error: "bad password" });
        }

        req.session.loggedInUser = req.body.username;
        res.redirect("/");

    });
});

app.use(function requireUserSession(req, res, next) {
    if (req.user) return next();

    if (req.is("json")) {
        res.status(401);
        return res.json({ error: "no user credentials" });
    }

    res.redirect("/login");
});

app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = app;
