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

    .post('/', async (req, res, next) => {

    })

    .put('/:id', async (req, res, next) => {

    })

    .delete('/:id', async (req, res, next) => {

    });
