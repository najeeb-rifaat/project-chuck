
// Import schemas for request validation
const {
  tidSchema,
  timeSchema,
  salarySchema,
  lastNameSchema,
  firstNameSchema,
  productCodeSchema,
  telephoneNumberSchema,
} = require('../schemas');

// export higher order func to produce route
module.exports = (completeHandler) => {
  return {
    path: '/complete',
    method: 'GET', // not sure this should be a get ...
    // handling method
    handler: completeHandler,
    // config for endpoint
    config: {
      description: 'Complete entry with data',
      notes: 'returns full record after update',
      tags: ['api'],
      validate: {
         // request contract 
        query: {
          tid: tidSchema,
          firstName: firstNameSchema.required(),
          lastName: lastNameSchema.required(),
          phoneNumber: telephoneNumberSchema.required(),
          product: productCodeSchema.required(),
          salary: salarySchema.required(),
          time: timeSchema.optional()
        }
      },
      // response contract 
      plugins: {
        'hapi-swagger': {
          responses: {
            202: { description: 'Success' },
            404: { description: 'Not Found' },
            500: { description: 'Internal Error' },
          }
        }
      }  
    }
  }
};
