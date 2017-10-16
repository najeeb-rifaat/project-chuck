const hapi = require('hapi');
const boom = require('boom');

// Import schemas for request validation
const {
  tidSchema,
  timeSchema,
  salarySchema,
  lastNameSchema,
  firstNameSchema,
  productCodeSchema,
  telephoneNumberSchema,
} = require('./schemas');

// this is test data import 
const testData = require('./fixture_data');

const {
  Customers
} = require('./models');
const {
  DataConnector
} = require('./connectors');
const {
  test,
  complete
} = require('./handlers');

const dataConnector = new DataConnector(testData);
const customerModel = new Customers(dataConnector);

module.exports = {
  get_server: (config) => {
    const server = new hapi.Server();
    server.connection(config);

    // register endpoint to handler for /test
    server.route({
      path: '/test',
      method: 'GET',
      // handling method
      handler: test(customerModel),
      // config for endpoint
      config: {
        validate: {
          query: {
            tid: tidSchema
          },
          failAction: 'error'
        }
      }
    });

    // register endpoint to handler for /complete
    server.route({
      path: '/complete',
      method: 'GET',
      // handling method
      handler: complete(customerModel),
      // config for endpoint
      config: {
        validate: {
          query: {
            tid: tidSchema,
            firstName: firstNameSchema.required(),
            lastName: lastNameSchema.required(),
            phoneNumber: telephoneNumberSchema.required(),
            product: productCodeSchema.required(),
            salary: salarySchema.required(),
            time: timeSchema.optional()
          }
        }
      }
    });

    server.ext('onPreResponse', function (request, reply) {
      if (request.response.isServer) {
        console.error('Internal error', request.response.message)
        reply(boom.create(500, 'Server error', { timestamp: Date.now() }));
      } else if (request.response.isBoom) {
        console.warn('Validation error', request.response.data)
        reply(boom.create(400, 'Bad request', { timestamp: Date.now() }));
      } else {
        return reply.continue();
      }
    });

    return server;
  },
  // register server plugins
  register_plugin: (server, register, options) => {
    server.register({
      register,
      options,
    }, (err) => {
      if (err) {
        console.log(`Server error at plugin registration`, err);
        throw err;
      }
    });
    return server;
  },
  // start server instance
  start_server: (server) => {
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log(`Server running at: ${server.info.uri}`);
    });
    return server;
  }
};