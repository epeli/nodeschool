
var assert = require("assert");

var helpers = require("./helpers");


describe("/api/posts", function() {
    var context = {};

    before(function(done) {
        helpers.login("admin", "secret", function(err, agent) {
            if (err) return done(err);
            context.agent = agent;
            done();
        });
    });

    it("can create new blog post using POST method", function(done) {

        context.agent
        .post("/api/posts")
        .send({
            title: "A blogpost",
            content: "Post content"
        }).end(function(err, res) {
            if (err) return done(err);

            assert.equal(200, res.status);
            assert.deepEqual({ ok: true }, res.body);
            done();
        });

    });


    // db.getAllWithPrefix(prefix)
    it("can list created blog posts from GET /api/posts", function(done) {

        context.agent
        .get("/api/posts")
        .end(function(err, res) {
            if (err) return done(err);

            assert.equal(200, res.status);
            assert.deepEqual([
                {"title":"A blogpost","content":"Post content"}
            ], res.body);
            done();
        });

    });

    // http://expressjs.com/4x/api.html#req.params
    it("can get single blog post from GET /api/posts/1", function(done) {

        context.agent
        .get("/api/posts/1")
        .end(function(err, res) {
            if (err) return done(err);

            assert.equal(200, res.status);
            assert.deepEqual(
                {"title":"A blogpost","content":"Post content"},
                res.body
            );
            done();
        });

    });

    it("responds not found (404) on missing post", function(done) {

        context.agent
        .get("/api/posts/999")
        .end(function(err, res) {
            if (err) return done(err);

            assert.equal(404, res.status);
            done();
        });

    });

    it("can edit post using PUT", function() {
    
    });

    // http://expressjs.com/4x/api.html#req.is
    // http://security.stackexchange.com/questions/10227/csrf-with-json-post
    it("does not allow post creation as application/x-www-form-urlencoded", function(done) {

        context.agent
        .post("/api/posts")
        .send({
            title: "A blogpost",
            content: "Post content"
        })
        .type("form")
        .end(function(err, res) {
            if (err) return done(err);

            assert.equal(
                406, res.status,
                "expected HTTP status 406 Not Acceptable"
            );
            done();
        });

    });


});
