const joi = require('joi');

module.exports = joi.string()
.alphanum()
.length(4) // exact length of 4
.example('AX07')
.description('Tracking identifier');
