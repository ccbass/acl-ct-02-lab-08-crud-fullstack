const pool = require('../lib/utils/pool');
const setupTest = require('../data/setup-test-db');
const request = require('supertest');
const app = require('../lib/app');



describe('Order Router CRUD Routes', () => {
  beforeEach(() => {
    return setupTest(pool);
  });
  afterAll(() => {
    return setupTest(pool);
  });

  it('returns all orders in the DB', async () => {
    const res = await request(app)
      .get('/api/orders')

    expect(res.body).toEqual([
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
    ])

  });
  
  it('Returns all orders from a single customer by ID', async () => {
    const res = await request(app)
    .get('/api/orders/customer/1')
    
    expect(res.body).toEqual([
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
    ])
    
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
  
  
});
