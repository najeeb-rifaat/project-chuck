const joi = require('joi');

module.exports = joi.string()
.alphanum()
.min(3)
.max(6)
.description('Product code');
