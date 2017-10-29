// Import schemas for request validation
const {
  trackingIdSchema,
  campaignIdSchema,
  customerSchema
} = require('../schemas');

// export higher order func to produce route
module.exports = (testHandler) => {
  return {
    path: '/test/{trackingId}/{campaignId}',
    method: 'POST',
    // handling method
    handler: testHandler,
    // config for endpoint
    config: {
      description: 'test entry existence and status',
      notes: 'returns full record',
      tags: ['api'],
      validate: {
        params: {
          trackingId: trackingIdSchema.required(),
          campaignId: campaignIdSchema.required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            202: { description: 'Accepted', schema: customerSchema},
            400: { description: 'Bad Input' },
            500: { description: 'Internal Error' },
          }
        }
      }  
    }
  }
};
