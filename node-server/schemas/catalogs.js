var mongoose = require('mongoose');


//用户的表结构

var Schema = mongoose.Schema;


var catalogSchema = new Schema({
    name: String
})

module.exports = catalogSchema;