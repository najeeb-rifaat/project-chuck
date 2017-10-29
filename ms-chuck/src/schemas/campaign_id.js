const joi = require('joi');

module.exports = joi.string()
.alphanum()
.length(6) // exact length of 6
.example('XC0001')
.description('Campaign identifier');
