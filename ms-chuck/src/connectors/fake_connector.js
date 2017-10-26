class DataConnector {

  constructor() {
    //TODO: this is fixture data initial state
    this.mock_persistance = [
      {
        tid: 'AX01'
      }, {
        tid: 'AX02'
      }, {
        tid: 'AX03'
      }, {
        tid: 'AX04'
      }, {
        tid: 'AX05'
      }
    ];
  }

  /**
   * Get row from persistance 
   * @param {String} tid - unique ID
   */
  get(tid) {
    return this.mock_persistance.find(thisRow => thisRow.tid === tid);
  }

  /**
   * Set row details with given details 
   * @param {String} tid - unique ID
   * @param {Object} args - Object to hold details that will be updated to persistance 
   */
  set(tid, {
    firstName,
    lastName,
    phoneNumber,
    salary,
    time,
    product
  }) {
    this.mock_persistance[this.mock_persistance.findIndex(thisRow => thisRow.tid === tid)] = {
      tid,
      firstName,
      lastName,
      phoneNumber,
      salary,
      product,
      time
    };
    return true;
  }

  /**
   * Delete record from persisted set
   * @param {String} tid - unique ID
   */
  delete(tid) {
    this.mock_persistance = this.mock_persistance.filter(thisRow => thisRow.tid !== tid);
    return true;
  }
}

module.exports = DataConnector;