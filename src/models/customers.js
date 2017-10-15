class Customers {
  constructor(dataConnector) {
    this.dataConnector = dataConnector;
  }

  /**
   * get customer data
   * @param {String} tid - Identifier
   */
  getCustomer(tid) {
    return this.dataConnector.get(tid);
  }

  /**
   * set customer data
   * @param {String} tid - Identifier
   * @param {Object} data - Data to persist
   */
  setCustomer(tid, data) {
    if(this.getCustomer(tid)) {
      return this.dataConnector.set(tid, data);
    }
    return false;
  }
}

module.exports = Customers;