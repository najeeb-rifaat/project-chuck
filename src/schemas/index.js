const joi = require('joi');

const tidSchema =
  joi.string()
  .alphanum()
  .length(4)
  .description('Main identifier');

const firstNameSchema =
  joi.string()
  .trim() // trim value on validation
  // .max(4) if there is a max length for first name
  .description('First Name');

const lastNameSchema =
  joi.string()
  .trim()
  .description('Main identifier');

const telephoneNumberSchema =
  joi.string()
  .min(7)
  .max(15)
  .description('Phone Number');

const salarySchema =
  joi.number()
  .description('Phone Number');

const productCodeSchema =
  joi.string()
  .alphanum()
  .min(3)
  .max(6)
  .description('Product code');

const timeSchema =
  joi.date()
  .iso()
  .description('Time Stamp');

module.exports = {
  tidSchema,
  firstNameSchema,
  lastNameSchema,
  telephoneNumberSchema,
  salarySchema,
  productCodeSchema,
  timeSchema
}