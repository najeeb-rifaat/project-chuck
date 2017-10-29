// Import schemas for request validation
const {
  trackingIdSchema,
  campaignIdSchema
} = require('../schemas');

// export higher order func to produce route
module.exports = (optoutHandler) => {
  return {
    path: '/optout/{trackingId}/{campaignId}',
    method: 'POST',
    // handling method
    handler: optoutHandler,
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
      // response contract 
      plugins: {
        'hapi-swagger': {
          responses: {
            200: { description: 'Success' },
            400: { description: 'Bad Input' },
            500: { description: 'Internal Error' },
          }
        }
      }
    }
  }
};
