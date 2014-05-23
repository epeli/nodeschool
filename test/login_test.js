
var assert = require("assert");

var helpers = require("./helpers");


describe("After login", function() {
    var context = {};

    before(function(done) {
        helpers.login("admin", "secret", function(err, agent) {
            if (err) return done(err);

            context.agent = agent;
            done();
        });
    });

    it("can fetch user information from /whoami", function(done) {
        context.agent.get("/whoami").end(function(err, res) {
            if (err) return done(err);

            assert.equal(200, res.status);
            assert.equal("Bob Brown", res.body.fullname);
            done();
        });
    });


});




