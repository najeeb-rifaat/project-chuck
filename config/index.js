module.exports = {
  //server config
  server: {
    port: 3000,
    host: '0.0.0.0'
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