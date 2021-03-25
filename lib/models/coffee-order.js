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

};

