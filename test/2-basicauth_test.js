
var request = require("supertest");
var assert = require("assert");

var db = require("../db");
var app = require("../server");

// resources/users.js
// https://github.com/visionmedia/node-basic-auth
// npm install --save basic-auth
describe("basic auth", function() {

    before(function(done) {
        db.reset();
        db.set("post:1", {
            title: "Post title",
            content: "Post content"
        }, done);
    });

    it("can be used to get a blog post from GET /api/posts/1", function(done) {

        request(app)
        .get("/api/posts/1")
        .auth("admin", "secret")
        .end(function(err, res) {
            if (err) return done(err);

            assert.equal(200, res.status);
            assert.deepEqual(
                {"title":"Post title","content":"Post content"},
                res.body
            );
            done();
        });

    });

});
