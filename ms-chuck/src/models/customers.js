class Customers {
  constructor(dataConnector) {
    this.dataConnector = dataConnector;
  }

  /**
   * 
   * @param {*} trackingId 
   * @param {*} campaignId 
   */
  registerInterest(trackingId, campaignId) {
    return this.dataConnector
    .getByTrackingAndCampaignId(trackingId, campaignId)
    .then(data => {
      if (data && data.length > 0) {
        return this._marshalDbToModel(data[0]);
      } else {
        return this.dataConnector
          .register(trackingId, campaignId)
          .then(newRowId => this.dataConnector.getById(newRowId))
          .then(newData => this._marshalDbToModel(newData[0]));
      }
    });
  }

  /**
   * 
   * @param {*} trackingId 
   * @param {*} campaignId 
   * @param {*} customerData 
   */
  registerDetails(trackingId, campaignId, customerData) {
    return this.dataConnector
    .getByTrackingAndCampaignId(trackingId, campaignId)
    .then(data => {
      if (data && data.length > 0) {
        return this.dataConnector.complete(trackingId, campaignId, customerData)
        .then(completedRowId => this.dataConnector.getById(completedRowId))
        .then(newData => this._marshalDbToModel(newData[0]));
      } else {
        console.warn(
          `Client was not registered with given tracking id (${trackingId}) and campaign id (${campaignId})`
        );
        return false;
      }
    })
  }

  /**
   * delete customer data
   * @param {Strong} tid - Identifier
   */
  optOut(trackingId, campaignId, phoneNumber) {
    if(this.dataConnector.optOut(trackingId, campaignId, phoneNumbe)) {
      return true;
    }
    return false;
  }


  _marshalDbToModel(dbData) {
    return {
      id: dbData.id,
      trackingId: dbData.tracking_id,
      campaignId: dbData.campaign_id,
      firstName: dbData.first_name,
      lastName: dbData.last_name,
      phoneNumber: dbData.phone_number,
      salary: dbData.salary,
      product: dbData.product,
      contactTime: {
        from: dbData.contact_time_from,
        to: dbData.contact_time_to
      },
      createdAt: dbData.created_at
    }
  }
}

module.exports = Customers;