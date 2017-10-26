const joi = require('joi');

module.exports = joi.date()
.iso() // ISO UTC date
.description('Time Stamp');
