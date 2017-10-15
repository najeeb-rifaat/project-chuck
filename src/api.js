const hapi = require('hapi');

// this is test data import 
const testData = require('./fixture_data');

const { Customers } = require('./models');
const { DataConnector } = require('./connectors');
const { test, complete } = require('./handlers');

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
      handler: test(customerModel)
    });

    // register endpoint to handler for /complete
    server.route({
      path: '/complete',
      method: 'GET',
      handler: complete(customerModel)
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