const joi = require('joi');

module.exports = joi.string()
.alphanum()
.length(4) // exact length of 4
.description('Main identifier');
