const joi = require('joi');

module.exports = joi.string()
.trim() // trim value on validation
.max(150)
.example('Charles')
.description('First Name');
