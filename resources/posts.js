

var express = require("express");


var db = require("../db");
var app = express.Router();

app.post("/api/posts", function(req, res, next) {
   if (!req.is("json")) {
        res.status(406);
        return res.end();
    }
    db.set("post:" + db.generateId(), req.body, function(err) {
        if (err) return next(err);
        res.json({ ok: true });
    });
});


app.get("/api/posts", function(req, res, next) {
    db.getAllWithPrefix("post:", function(err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

app.get("/api/posts/:id", function(req, res, next) {
    db.get("post:" + req.params.id, function(err, post) {
        if (err) return next(err);
        if (!post) {
            res.status(404);
            res.end();
            return;
        }
        res.json(post);
    });
});

module.exports = app;
