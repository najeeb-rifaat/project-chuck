const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const config = require('../config');
const apiServer = require('./server');
const { Customers } = require('./models');
const { FakeConnector, MySqlConnector } = require('./connectors');
const { testHandler, optoutHandler, completeHandler } = require('./handlers');
const { testRoute, optoutRoute, completeRoute } = require('./routes');

const server = new apiServer(config.server);
console.log(config.database);
const sqlConnector = new MySqlConnector(config.database);
const customerModel = new Customers(sqlConnector);

server.registerPlugin(server, Good, config.logging);
server.registerPlugin(server, Inert);
server.registerPlugin(server, Vision);
server.registerPlugin(server, HapiSwagger, config.package);

// add /test handler
server.addRoute(
  testRoute(
    testHandler(customerModel)
  )
);

// add /complete handler
server.addRoute(
  completeRoute(
    completeHandler(customerModel)
  )
);

// add /optout handler
server.addRoute(
  optoutRoute(
    optoutHandler(customerModel)
  )
);

// Start server
server.startServer();
