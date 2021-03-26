const CoffeeOrder = require("../models/coffee-order");
const Customer = require("../models/customers");


module.exports = class OrderService {
    
    static async getAllOrders() {
        const allOrders = await CoffeeOrder.selectAllOrders()

        return allOrders;
    }

    static async createOrder({name, address, coffeeType, quantity, subscription}) {
        const customer = await Customer.selectCustomerByName(name)
        let customerId;

        if (customer === 'invalid'){
            const newCustomer = await Customer.insertCustomer(name, address)
            customerId = newCustomer.customerId
        } else {
            customerId = customer.customerId
        }

        const newOrder = await CoffeeOrder.insertOrder(coffeeType, quantity, subscription, customerId)

        return {details: "order processed", data: newOrder}

    }

    static async getOneOrder(id) {

    }

    static async getOrdersByCustomer(id) {
        const allOrders = await CoffeeOrder.selectOrdersByCustomer(id)

        return allOrders;
    }

    static async updateOneOrder(quantity, id) {

    }

    static async deleteOneOrder(id) {

    }


    };
