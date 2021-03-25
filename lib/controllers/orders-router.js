const { Router } = require('express');
const OrderService = require('../services/coffee-order-service');


module.exports = Router()

    .get('/', async (req, res, next) => {
        try {
            const allOrders = await OrderService.getAllOrders();
            res.send(allOrders);
          } catch (err) {
            next(err);
          }
    })

    .get('/customer/:id', async (req, res, next) => {
        const { id } = req.params

        try {
          const singleCustomerOrders = await OrderService.getOrdersByCustomer(id);
          res.send(singleCustomerOrders);
        } catch (err) {
          next(err);
        }
    })

    .post('/', async (req, res, next) => {

    })

    .put('/:id', async (req, res, next) => {

    })

    .delete('/:id', async (req, res, next) => {

    });
