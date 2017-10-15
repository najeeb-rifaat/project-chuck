const good = require('good');

const api = require('./api');
const config = require('../config');

// Get configured server (based on passed in configurations)
const server = api.get_server(config.server);

// Register logging framework 
api.register_plugin(server, good, config.logging);

// Start server listing
api.start_server(server);