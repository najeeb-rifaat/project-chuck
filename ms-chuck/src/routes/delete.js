// Import schemas for request validation
const {
  tidSchema
} = require('../schemas');

// export higher order func to produce route
module.exports = (testHandler) => {
  return {
    path: '/delete',
    method: 'GET',
    // handling method
    handler: testHandler,
    // config for endpoint
    config: {
      description: 'test entry existence and status',
      notes: 'returns full record',
      tags: ['api'],
      validate: {
         // request contract 
        query: {
          tid: tidSchema
        }
      },
      // response contract 
      plugins: {
        'hapi-swagger': {
          responses: {
            200: { description: 'Success' },
            404: { description: 'Not Found' },
            400: { description: 'Bad Input' },
            500: { description: 'Internal Error' },
          }
        }
      }  
    }
  }
};
