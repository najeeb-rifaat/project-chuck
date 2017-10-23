const joi = require('joi');

module.exports = joi.string()
.min(7)
.max(15)
.description('Phone Number');
