const joi = require('joi');

module.exports = joi.string()
.min(7)
.max(15)
.example('01199992123')
.description('Phone Number');
