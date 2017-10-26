const joi = require('joi');

module.exports = joi.string()
.trim() // trim value on validation
// .max(4) if there is a max length for first name
.description('First Name');
