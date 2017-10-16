class DataConnector {

  constructor(fixtureData) {
    this.mock_persistance = fixtureData;
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
  set(tid, { firstName, lastName, phoneNumber, salary, time, product }) {
    this.mock_persistance[this.mock_persistance.findIndex(thisRow => thisRow.tid === tid)] = {
      tid, firstName, lastName, phoneNumber, salary, product, time
    };
    return true;
  }
}

module.exports = DataConnector;