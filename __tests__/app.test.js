const pool = require('../lib/utils/pool');
const setupTest = require('../data/setup-test-db');
const request = require('supertest');
const app = require('../lib/app');


jest.mock("../lib/utils/aws-ses", () => () => ({
  ResponseMetadata: { RequestId: '11111111-1111' },
  MessageId: '1111111-1111111-111111-111111'
}) );


describe('Order Router CRUD Routes', () => {

  // Setup DB for tests before and after running
  beforeEach(() => {
    return setupTest(pool);
  });
  afterAll(() => {
    return setupTest(pool);
  });


  it('returns all orders in the DB', async () => {
    const res = await request(app)
      .get('/api/orders')

    expect(res.body).toEqual({
      details: "all orders in db", 
      data: [
        {
            "orderId": 1,
            "coffeeType": "Ethopian",
            "quantity": 5,
            "orderDate": expect.any(String),
            "subscription": 2,
            "customerId": 1
        },
        {
            "orderId": 2,
            "coffeeType": "Honduras",
            "quantity": 10,
            "orderDate": expect.any(String),
            "subscription": 3,
            "customerId": 1
        },
        {
            "orderId": 3,
            "coffeeType": "Brazil",
            "quantity": 15,
            "orderDate": expect.any(String),
            "subscription": 4,
            "customerId": 2
        },
        {
            "orderId": 4,
            "coffeeType": "Colombian",
            "quantity": 20,
            "orderDate": expect.any(String),
            "subscription": 2,
            "customerId": 2
        },
        {
            "orderId": 5,
            "coffeeType": "Indonesia",
            "quantity": 30,
            "orderDate": expect.any(String),
            "subscription": 9,
            "customerId": 2
        },
        {
            "orderId": 6,
            "coffeeType": "Mexico",
            "quantity": 35,
            "orderDate": expect.any(String),
            "subscription": 7,
            "customerId": 3
        },
        {
            "orderId": 7,
            "coffeeType": "Peru",
            "quantity": 40,
            "orderDate": expect.any(String),
            "subscription": 6,
            "customerId": 3
        },
        {
            "orderId": 8,
            "coffeeType": "Haitian",
            "quantity": 45,
            "orderDate": expect.any(String),
            "subscription": 12,
            "customerId": 3
        }
    ]})
  });
  

  it('Returns one order by ID', async () => {
    const res = await request(app)
    .get('/api/orders/2')
    
    expect(res.body).toEqual({
      "details": "order details for order_id:2",
      "data": {
          "orderId": 2,
          "coffeeType": "Honduras",
          "quantity": 10,
          "orderDate": expect.any(String),
          "subscription": 3,
          "customerId": 1
      }
    })
  });

  it('Returns all orders from a single customer by ID', async () => {
    const res = await request(app)
    .get('/api/orders/customers/1')
    
    expect(res.body).toEqual({ 
      details: "all orders for customer_id: 1", 
      data: [
      {
          "orderId": 1,
          "coffeeType": "Ethopian",
          "quantity": 5,
          "orderDate": expect.any(String),
          "subscription": 2,
          "customerId": 1
      },
      {
          "orderId": 2,
          "coffeeType": "Honduras",
          "quantity": 10,
          "orderDate": expect.any(String),
          "subscription": 3,
          "customerId": 1
      }
    ]})
  });
  

  it('POST: creates an order and returns the data', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        "name": "Some Name",
        "address": "New Address",
        "coffeeType": "Columbian", 
        "quantity": 7, 
        "subscription": 3
      })

    expect(res.body).toEqual({
      "details": "order processed",
      "data": {
          "orderId": 9,
          "coffeeType": "Columbian",
          "quantity": 7,
          "orderDate": expect.any(String),
          "subscription": 3,
          "customerId": 4
      }
    })

  });


  it('PUT: updates an order and returns the updated row', async () => {
    const res = await request(app)
      .put('/api/orders/1')
      .send({
        "coffeeType": "updated coffee",
        "quantity": 999,
        "subscription": 5
      })

    expect(res.body).toEqual({
          "orderId": 1,
          "coffeeType": "updated coffee",
          "quantity": 999,
          "orderDate": expect.any(String),
          "subscription": 5,
          "customerId": 1
    })
  });


  it('DELETE: deletes an order and returns the row', async () => {
    const res = await request(app)
      .delete('/api/orders/2')

    expect(res.body).toEqual({
      "details": "deleted order for order_id:2",
      "data": {
          "orderId": 2,
          "coffeeType": "Honduras",
          "quantity": 10,
          "orderDate": expect.any(String),
          "subscription": 3,
          "customerId": 1
      }
    })
    let totalRows = await pool.query(`SELECT COUNT(*) FROM coffee_orders`)
    totalRows = Number(totalRows.rows[0].count)
    expect(totalRows).toEqual(7)
  });
  
  
});
