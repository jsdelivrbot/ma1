var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
// SCHEMA SETUP
    var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true, select: true},
    admin: {type: Number},
});

module.exports = mongoose.model("User", UserSchema);