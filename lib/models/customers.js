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

  static async insertCustomer(name, address) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO customers(customer_name, customer_address) VALUES ($1, $2) RETURNING *',
      [name, address]
    );
    return new Customer(rows[0]);
  }

  static async selectCustomerByName(name) {
    const {
      rows,
    } = await pool.query(
      'SELECT * FROM customers WHERE customer_name=$1',
      [name]
    );

    if (rows.length === 0){
        return 'invalid'
    }

    return rows.map( customer => new CoffeeOrder(customer) );
  }

};

