
var request = require("supertest");

var app = require("../server");

function login(username, password, cb) {
    var agent = request.agent(app);
    agent.post("/login").send({
        username: username,
        password: password
    })
    .end(function(err, res) {
        if (err) return cb(err);
        // OK and redirects are fine
        if ([200, 302, 301].indexOf(res.status) === -1) {
            return cb(new Error("login failed: " + res.status));
        }
        cb(null, agent);
    });

}


module.exports = {
    login: login
};
