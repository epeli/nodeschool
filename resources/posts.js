

var express = require("express");
var browserify = require('browserify-middleware');

var db = require("../db");
var app = express.Router();

app.get('/js/file.js', browserify('./client/file.js'));

app.get("/api/posts", function(req, res, next) {

	db.getAllWithPrefix("blog",function(err,docs) {
		if (err) return next(err);

		res.json(docs);
	});

});

app.post("/api/posts", function(req, res, next) {

    //debugger;
    if(!req.is('json')) {
    	res.status(406).end();
    	return;
    }

    var postId = db.generateId();
    db.set('blog:'+postId, req.body, function(err, user){
        if (err) return next(err);
        res.status(200);
        res.send({'ok':true});
        //res.json({'ok': true}).status(200).end();
    });
});

// app.delete("/api/posts/:id", (req, res, next) {

// app.delete("/api/posts/1,2,4,5,7", (req, res, next) {

// app.post("/api/posts/_update_count")

app.get("/api/posts/:id", function(req, res, next) {

	db.get("blog:"+ req.params.id,function(err,docs) {
		if (err) return next(err);
		if (docs === undefined) {
			res.status(404).end();
			return;
		}
		res.json(docs);
	});

});

// app.get("/api/posts/:id/comments", function(req)


app.put("/api/posts/:id", function(req){

});

module.exports = app;
