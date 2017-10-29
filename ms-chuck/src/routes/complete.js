const joi = require('joi');

// Import schemas for request validation
const {
  trackingIdSchema,
  campaignIdSchema,
  timeSchema,
  salarySchema,
  lastNameSchema,
  firstNameSchema,
  productSchema,
  phoneNumberSchema,
  customerSchema
} = require('../schemas');


// export higher order func to produce route
module.exports = (completeHandler) => {
  return {
    path: '/complete/{trackingId}/{campaignId}',
    method: 'POST', // not sure this should be a get ...
    // handling method
    handler: completeHandler,
    // config for endpoint
    config: {
      description: 'Complete entry with data',
      notes: 'returns full record after update',
      tags: ['api'],
      validate: {
        params: {
          trackingId: trackingIdSchema.required(),
          campaignId: campaignIdSchema.required()
         },
         payload: joi.object({
          firstName: firstNameSchema.required(),
          lastName: lastNameSchema.required(),
          phoneNumber: phoneNumberSchema.required(),
          product: productSchema.required(),
          salary: salarySchema.required(),
          contactTimeFrom: timeSchema.optional(),
          contactTimeTo: timeSchema.optional()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            202: { description: 'Accepted', schema: customerSchema },
            400: { description: 'Bad Input' },
            404: { description: 'Not Found' },
            500: { description: 'Internal Error' },
          }
        }
      }  
    },
  }
};
