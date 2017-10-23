const hapi = require('hapi');
const boom = require('boom');

/**
 * 
 */
class Server {

  constructor(config) {
    this.server = new hapi.Server();
    this.serverStarted = false;
    this.server.connection(config);
    this._preHandleErrors();
  }

  /**
   * 
   * @param {*} route 
   */
  addRoute(route) {
    if (this.serverStarted) {
      throw new Error(
        'Server has started, please do run route  registration prior to server start'
      );
    }
    this.server.route(route);
  }

  /**
   * 
   * @param {*} server 
   * @param {*} register 
   * @param {*} options 
   */
  registerPlugin(server, register, options) {
    this.server.register({
      register,
      options,
    }, (err) => {
      if (err) {
        console.log(`Server error at plugin registration`, err);
        throw err;
      }
    });
  }

  /**
   * 
   * @param {*} server 
   */
  startServer() {
    this.server.start((err) => {
      if (err) {
        throw err;
      }
      console.log(`Server running at: ${this.server.info.uri}`);
    });
    this.serverStarted;
  }

  /**
   * 
   */
  _preHandleErrors() {
    if (this.serverStarted) {
      throw new Error(
        'Server has started, please do run pre-handler registration  prior to server start'
      );
    }
    
    this.server.ext('onPreResponse', (request, reply) => {
      if (request.response.isServer) {
        //TODO: better error logging, when server fails
        console.error('Internal error', request.response.message)
        reply(boom.create(500, 'Server error', { timestamp: Date.now() }));
      } else if (request.response.isBoom) {
        //TODO: better error logging, when user input is malformed
        console.warn('Validation error', request.response.data)
        reply(boom.create(400, 'Bad request', { timestamp: Date.now() }));
      } else {
        //TODO: Other logging incase it is needed
        return reply.continue();
      }
    });
  }
};

 module.exports = Server;
 