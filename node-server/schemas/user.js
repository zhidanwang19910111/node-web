var mongoose = require('mongoose');


//用户的表结构

var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = userSchema;