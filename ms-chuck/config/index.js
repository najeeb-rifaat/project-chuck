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
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || '0.0.0.0'
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
  },

  // DB connection info
  database: {
    host     : process.env.DB_HOST || '127.0.0.1',
    user     : process.env.DB_USER || 'root',
    password : process.env.DB_PASS || 'project-chuck',
    database : process.env.DB_NAME || 'project-chuck'
  }
};