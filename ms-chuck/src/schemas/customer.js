const joi = require('joi');

const trackingIdSchema = require('./tracking_id');
const campaignIdSchema = require('./campaign_id');
const firstNameSchema = require('./first_name');
const lastNameSchema = require('./last_name');
const phoneNumberSchema = require('./phone_number');
const salarySchema = require('./salary');
const productSchema = require('./product');
const timeSchema = require('./time');

module.exports = joi.object({
  id: joi.number(),
  trackingId: trackingIdSchema,
  campaignId: campaignIdSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phoneNumber: phoneNumberSchema,
  salary: salarySchema,
  product: productSchema,
  contactTime: joi.object({
    from: timeSchema,
    to: timeSchema
  }),
  createdAt: joi.date().iso()
});