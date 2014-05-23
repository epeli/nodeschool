

var assert = require("assert");

var helpers = require("./helpers");
var db = require("../db");


describe("/api/posts/:id/comments", function() {
    var context = {};

    before(function(done) {
        db.reset();
        db.set("post:1", {
            title: "Post title",
            content: "Post content"
        }, function(err) {
          if (err) return done(err);

          helpers.login("admin", "secret", function(err, agent) {
              if (err) return done(err);
              context.agent = agent;
              done();
          });

        });
    });


    it("can add comment to a post using POST /api/posts/:id/comments", function(done) {
        done();
    });

    it("comments are added to GET /api/posts/1", function(done) {
        done();
    });

});
