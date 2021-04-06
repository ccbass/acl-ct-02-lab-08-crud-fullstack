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

    .get('/:id', async (req, res, next) => {
        try {
            const oneOrder = await OrderService.getOneOrder(req.params.id);
            res.send(oneOrder);
          } catch (err) {
            console.log(err)
            next(err);
          }
    })

    .get('/customers/:id', async (req, res, next) => {
        const { id } = req.params

        try {
          const singleCustomerOrders = await OrderService.getOrdersByCustomer(id);
          if (!singleCustomerOrders.success){
            res.status(404).send(singleCustomerOrders)
          } else{
            res.send(singleCustomerOrders);
          }
          
        } catch (err) {
          next(err);
        }
    })

    .post('/', async (req, res, next) => {
      
      try {
        const newOrder = await OrderService.createOrder(req.body);
        res.send(newOrder);
      } catch (err) {
        next(err);
      }
    })

    .put('/:id', async (req, res, next) => {
      try {
        const updatedOrder = await OrderService.updateOneOrder(req.params, req.body);
        res.send(updatedOrder);
      } catch (err) {
        next(err);
      }

    })

    .delete('/:id', async (req, res, next) => {
      try {
        const deletedOrder = await OrderService.deleteOneOrder(req.params.id);
        res.send(deletedOrder);
      } catch (err) {
        next(err);
      }

    });
