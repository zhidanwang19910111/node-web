var mongoose = require('mongoose');

var contentSchema = require('../schemas/content.js');

module.exports = mongoose.model('Contents', contentSchema);
