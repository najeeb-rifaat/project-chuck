const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const config = require('../config');
const apiServer = require('./server');
const { Customers } = require('./models');
const { FakeConnector } = require('./connectors');
const { testHandler, completeHandler } = require('./handlers');
const { testRoute, completeRoute } = require('./routes');

const fakeConnector = new FakeConnector();
const customerModel = new Customers(fakeConnector);

const server = new apiServer(config.server);

server.registerPlugin(server, Good, config.logging);
server.registerPlugin(server, Inert);
server.registerPlugin(server, Vision);
server.registerPlugin(server, HapiSwagger, config.package);

server.addRoute(testRoute(testHandler(customerModel)));
server.addRoute(completeRoute(completeHandler(customerModel)));

server.startServer();
