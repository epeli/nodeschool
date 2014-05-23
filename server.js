
var express = require("express");

var app = express();

app.use(require("body-parser")());
app.use(require("cookie-parser")());
app.use(require("express-session")({
    secret: "sessionsecret", // XXX
}));


app.use(require("./resources/users"));
app.use(require("./resources/posts"));


app.use(require("serve-static")(__dirname + "/public"));

// For tests
module.exports = app;

// When this application is actually executed using `node server.js`
if (require.main === module) {
    app.listen(8080, function() {
        console.log("Listening on http://localhost:8080");
    });
}

