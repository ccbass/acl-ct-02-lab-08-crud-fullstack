const pool = require('../lib/utils/pool');
const setupTest = require('../data/setup-test-db');
const request = require('supertest');
const app = require('../lib/app');

const allOrdersResult = [{"order_id":1,"coffee_type":"Ethopian","quantity":5,"order_date":"2021-03-25T07:00:00.000Z","subscription":2,"linked_customer_id":1},{"order_id":2,"coffee_type":"Honduras","quantity":10,"order_date":"2021-03-25T07:00:00.000Z","subscription":3,"linked_customer_id":1},{"order_id":3,"coffee_type":"Brazil","quantity":15,"order_date":"2021-03-25T07:00:00.000Z","subscription":4,"linked_customer_id":2},{"order_id":4,"coffee_type":"Colombian","quantity":20,"order_date":"2021-03-25T07:00:00.000Z","subscription":2,"linked_customer_id":2},{"order_id":5,"coffee_type":"Indonesia","quantity":30,"order_date":"2021-03-25T07:00:00.000Z","subscription":9,"linked_customer_id":2},{"order_id":6,"coffee_type":"Mexico","quantity":35,"order_date":"2021-03-25T07:00:00.000Z","subscription":7,"linked_customer_id":3},{"order_id":7,"coffee_type":"Peru","quantity":40,"order_date":"2021-03-25T07:00:00.000Z","subscription":6,"linked_customer_id":3},{"order_id":8,"coffee_type":"Haitian","quantity":45,"order_date":"2021-03-25T07:00:00.000Z","subscription":12,"linked_customer_id":3}]


describe('crud-expanded routes', () => {
  beforeEach(() => {
    return setupTest(pool);
  });

  it('returns all orders in the DB', async () => {
    const res = await request(app)
      .get('/api/orders')

    expect(res.body).toEqual(allOrdersResult)

  });

});
