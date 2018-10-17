var mongoose = require('mongoose');

var catalogSchema = require('../schemas/catalogs');

module.exports = mongoose.model('catalog', catalogSchema)
