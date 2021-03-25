const pool = require('../utils/pool');

module.exports = class Customer {
  customerId;
  customerName;
  customerAddress;


  constructor(row) {
    this.customerId = row.customer_id;
    this.customerName = row.customer_name;
    this.customerAddress = row.customer_address;
  }

};

