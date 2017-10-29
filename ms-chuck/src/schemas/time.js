const joi = require('joi');

module.exports = joi.string()
.regex(/^(\d){2}:(\d){2}$/) //TODO add reges validation 
.description('Time Stamp');
