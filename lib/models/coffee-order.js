const pool = require('../utils/pool');

module.exports = class CoffeeOrder {
  orderId;
  coffeeType;
  quantity;
  orderDate;
  subscription;
  linkedCustomerId;

  constructor(row) {
    this.orderId = row.order_id;
    this.coffeeType = row.coffee_type; 
    this.quantity = row.quantity;
    this.orderDate = row.order_date;
    this.subscription = row.subscription;
    this.customerId = row.linked_customer_id
  }

  static async insertOrder(coffee, quantity, subscription, custId) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO coffee_orders(coffee_type, quantity, subscription, linked_customer_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [coffee, quantity, subscription, custId]
    );

    return new CoffeeOrder(rows[0]);
  }

  static async selectSingleOrder(id) {
    const {
      rows,
    } = await pool.query(
      'SELECT * FROM coffee_orders WHERE order_id=$1',
      [id]
    );

    return  new CoffeeOrder(rows[0]);
  }

  static async selectAllOrders() {
    const {
      rows,
    } = await pool.query(
      'SELECT * FROM coffee_orders'
    );

    return rows.map( order => new CoffeeOrder(order) );
  }

  static async selectOrdersByCustomer(id) {
    const {
      rows,
    } = await pool.query(
      'SELECT * FROM coffee_orders WHERE linked_customer_id=$1',
      [id]
    );

    return rows.map( order => new CoffeeOrder(order) );
  }


  static async updateSingleOrder(id, coffee, quantity, subscription) {
    const {
      rows,
    } = await pool.query(
      'UPDATE coffee_orders ' +
        'SET ' + 
          'coffee_type= COALESCE( $1, coffee_type ),' +
          'quantity= COALESCE( $2, quantity ),' +
          'subscription= COALESCE( $3, subscription ) ' +
        'WHERE order_id=$4 ' +
      'RETURNING *',
      [coffee, quantity, subscription, id]
    );

    return new CoffeeOrder(rows[0]);
  }

  static async deleteSingleOrder(id) {
    const {
      rows,
    } = await pool.query(
      'DELETE FROM coffee_orders WHERE order_id=$1 RETURNING *',
      [id]
    );

    return new CoffeeOrder(rows[0]);
  }


};

