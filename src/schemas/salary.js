const joi = require('joi');

module.exports = joi
.number()
.integer()
.min(0) // positive numbers only
.description('Salary');