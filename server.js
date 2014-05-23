
var express = require("express");

var app = express();
var config = require("./config.json");

app.use(require("body-parser")());
app.use(require("cookie-parser")());
app.use(require("express-session")({
    secret: config.sessionSecret
}));


app.use(require("./resources/users"));
app.use(require("./resources/posts"));
app.use(require("./resources/comments"));


app.use(require("serve-static")(__dirname + "/public"));

// For tests
module.exports = app;

// When this application is actually executed using `node server.js`
if (require.main === module) {
    app.listen(8080, function() {
        console.log("Listening on http://localhost:8080");
    });
}

