var mysql = require('mysql');

class MySqlConnector {
  /**
   * Create new MySqlConnection
   * @param {Object} connectionInfo - DB connection info 
   */
  constructor(connectionInfo) {
    this._connection = new mysql.createConnection(
      connectionInfo
    );

    this._connected = false;
  }

  /**
   * 
   * @param {*} id 
   */
  getById(id) {
    this._connect();
    return new Promise((resolve, reject) => {
      this._connection.query(`
          SELECT id,
            tracking_id,
            campaign_id,
            first_name,
            last_name,
            phone_number,
            salary,
            product,
            contact_time_from,
            contact_time_to,
            created_at
          FROM campaign_tracker
          WHERE id = '${id}'`
      , (queryError, results) => {
        if (queryError) {
          reject(queryError)
        }
        resolve(results);
      })
    });
  }

  /**
   * get
   * @param {String} trackingId
   */
  getByTrackingAndCampaignId(trackingId, campaignId) {
    this._connect();
    return new Promise((resolve, reject) => {
      this._connection.query(`
        SELECT id,
          tracking_id,
          campaign_id,
          first_name,
          last_name,
          phone_number,
          salary,
          product,
          contact_time_from,
          contact_time_to,
          created_at
        FROM campaign_tracker
        WHERE tracking_id = '${trackingId}'
        AND campaign_id = '${campaignId}'
        ORDER BY created_at DESC
        LIMIT 1` // TODO: this is limiting the selection to the last one added?
      , (queryError, results) => {
        if (queryError) {
          reject(queryError)
        }
        resolve(results);
      });
    });
  }

  /**
   * register
   * @param {String} tid - Tracking ID
   * @param {object} details - details of client
   */
  register(trackingId, campaignId) {
    this._connect();
    return new Promise((resolve, reject) => {
      this._connection.query(`
        INSERT INTO \`campaign_tracker\` 
        (\`tracking_id\`, \`campaign_id\`, \`created_at\`)
        VALUES 
          (
            '${trackingId}',
            '${campaignId}',
            now()
          );`
      , (queryError, results) => {
        if (queryError) {
          reject(queryError)
        }
        resolve(results.insertId);
      })
    });
  }
  
  /**
   * complete
   * @param {String} trackingId - Tracking ID
   * @param {object} details - details of client
   */
  complete(trackingId, campaignId, { firstName, lastName, phoneNumber, salary, product, contactTimeFrom, contactTimeTo }) {
    this._connect();
    return new Promise((resolve, reject) => {
      this._connection.query(`
      INSERT INTO \`campaign_tracker\` 
      VALUES 
        (
          NULL,
          '${trackingId}',
          '${campaignId}',
          '${firstName}',
          '${lastName}',
          '${phoneNumber}',
          '${salary}',
          '${product}',
          '${contactTimeFrom}',
          '${contactTimeTo}',
          now()
        );`
      , (queryError, results) => {
        if (queryError) {
          reject(queryError)
        }
        resolve(results.insertId);
      });
    });
  }

  /**
   * Opt out 
   * @param {*} trackingId 
   */
  optOut(trackingId, campaignId, phoneNumber) {
    this._connect();
    return new Promise((resolve, reject) => {
      this._connection.query(`
      INSERT INTO \`campaign_opt_out\` 
      VALUES 
        (
          NULL,
          '${trackingId}',
          '${campaignId}',
          '${phoneNumber}',
          now()
        );`
      , (queryError, results) => {
        if (queryError) {
          reject(queryError)
        }
        resolve(results.insertId);
      });
    });
  }


  _connect() {
    if (!this._connected) {
      this._connection.connect((sqlConnectionError) => {
        if (sqlConnectionError) {
          console.error(`SQL connection error: + ${sqlConnectionError.stack}`);
          throw sqlConnectionError;
        }
        console.log(`SQL connected as id: ${this._connection.threadId}`);
        this._connected = true;
      });
    }
    return this._connection;
  }
}

module.exports =  MySqlConnector;