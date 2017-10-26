const pkg = require('../package.json');

module.exports = {
  // package info
  package: {
    info: {
      title: pkg.name,
      version: pkg.version
    }
  },

  //server config
  server: {
    port: 3000,
    host: '0.0.0.0',
    routes: { cors: true }
  },

  // logging config
  logging: {
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ response: '*', log: '*' }]
        },
        { module: 'good-console' },
        'stdout'
      ]
    }
  }
};