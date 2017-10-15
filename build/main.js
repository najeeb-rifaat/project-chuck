require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var good = __webpack_require__(2);

var api = __webpack_require__(3);
var config = __webpack_require__(13);

// Get configured server (based on passed in configurations)
var server = api.get_server(config.server);

// Register logging framework 
api.register_plugin(server, good, config.logging);

// Start server listing
api.start_server(server);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("good");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var hapi = __webpack_require__(4);

// this is test data import 
var testData = __webpack_require__(5);

var _require = __webpack_require__(6),
    Customers = _require.Customers;

var _require2 = __webpack_require__(8),
    DataConnector = _require2.DataConnector;

var _require3 = __webpack_require__(10),
    test = _require3.test,
    complete = _require3.complete;

var dataConnector = new DataConnector(testData);
var customerModel = new Customers(dataConnector);

module.exports = {
  get_server: function get_server(config) {
    var server = new hapi.Server();
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
  register_plugin: function register_plugin(server, register, options) {
    server.register({
      register: register,
      options: options
    }, function (err) {
      if (err) {
        console.log('Server error at plugin registration', err);
        throw err;
      }
    });
    return server;
  },
  // start server instance
  start_server: function start_server(server) {
    server.start(function (err) {
      if (err) {
        throw err;
      }
      console.log('Server running at: ' + server.info.uri);
    });
    return server;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = [{
  tid: 'AX01'
}, {
  tid: 'AX02'
}, {
  tid: 'AX03'
}];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Customers = __webpack_require__(7);

module.exports = {
  Customers: Customers
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Customers = function () {
  function Customers(dataConnector) {
    _classCallCheck(this, Customers);

    this.dataConnector = dataConnector;
  }

  /**
   * get customer data
   * @param {String} tid - Identifier
   */


  _createClass(Customers, [{
    key: "getCustomer",
    value: function getCustomer(tid) {
      return this.dataConnector.get(tid);
    }

    /**
     * set customer data
     * @param {String} tid - Identifier
     * @param {Object} data - Data to persist
     */

  }, {
    key: "setCustomer",
    value: function setCustomer(tid, data) {
      if (this.getCustomer(tid)) {
        return this.dataConnector.set(tid, data);
      }
      return false;
    }
  }]);

  return Customers;
}();

module.exports = Customers;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var DataConnector = __webpack_require__(9);

module.exports = {
  DataConnector: DataConnector
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataConnector = function () {
  function DataConnector(fixtureData) {
    _classCallCheck(this, DataConnector);

    this.mock_persistance = fixtureData;
  }

  /**
   * Get row from persistance 
   * @param {String} tid - unique ID
   */


  _createClass(DataConnector, [{
    key: "get",
    value: function get(tid) {
      return this.mock_persistance.find(function (thisRow) {
        return thisRow.tid === tid;
      });
    }

    /**
     * Set row details with given details 
     * @param {String} tid - unique ID
     * @param {Object} args - Object to hold details that will be updated to persistance 
     */

  }, {
    key: "set",
    value: function set(tid, _ref) {
      var first_name = _ref.first_name,
          last_name = _ref.last_name,
          tel_number = _ref.tel_number,
          salary = _ref.salary,
          time = _ref.time,
          product = _ref.product;

      this.mock_persistance[this.mock_persistance.findIndex(function (thisRow) {
        return thisRow.tid === tid;
      })] = {
        tid: tid, first_name: first_name, last_name: last_name, tel_number: tel_number, salary: salary, product: product, time: time
      };
      return true;
    }
  }]);

  return DataConnector;
}();

module.exports = DataConnector;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var test = __webpack_require__(11);
var complete = __webpack_require__(12);

module.exports = {
  test: test,
  complete: complete
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (customersModel) {
  return function (request, reply) {
    var tid = request.query['tid'];
    var data = customersModel.getCustomer(tid);

    if (data) {
      //TODO: check if row have been consumed ? 
      reply(data);
    } else {
      reply('Not Found').code(404);
    }
  };
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (customersModel) {
  return function (request, reply) {
    var tid = request.query['tid'];
    var first_name = request.query['fname'];
    var last_name = request.query['lname'];
    var tel_number = request.query['tel'];
    var salary = request.query['salary'];
    var product = request.query['product'];
    var time = request.query['time'];

    var data = customersModel.getCustomer(tid);

    if (data) {
      var success = customersModel.setCustomer(tid, { first_name: first_name, last_name: last_name, tel_number: tel_number, salary: salary, time: time, product: product });
      if (success) {
        reply('Success').code(202);
      } else {
        reply('Error').code(500);
      }
    } else {
      reply('Not Found').code(404);
    }
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
  //server config
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // logging config
  logging: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ response: '*', log: '*' }]
      }, { module: 'good-console' }, 'stdout']
    }
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map