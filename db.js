
var store = null;

var sequence = 0;

module.exports = {

    reset: function() {
        sequence = 0;
        store = {

            "user:admin": {
                fullname: "Bob Brown",
                username: "admin",
                password: "secret"
            }
        };

    },

    set: function(key, value, cb) {
        store[key] = value;
        process.nextTick(function() {
            cb();
        });
    },

    get: function(key, cb) {
        process.nextTick(function() {
            cb(null, store[key]);
        });
    },

    getAllWithPrefix: function(prefix, cb) {
        process.nextTick(function() {
            var docs = Object.keys(store).filter(function(key) {
                return key.indexOf(prefix) === 0;
            }).map(function(key) {
                return store[key];
            });

            cb(null, docs);
        });
    },

    generateId: function() {
        sequence += 1;
        return  sequence;
    },

};

module.exports.reset();
