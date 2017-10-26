const joi = require('joi');

module.exports = joi.string()
.trim() // throwing trim here so when hapi validates the input, trimming is applied.
.description('Main identifier');
