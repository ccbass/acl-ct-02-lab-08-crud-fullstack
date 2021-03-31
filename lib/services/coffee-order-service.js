const CoffeeOrder = require("../models/coffee-order");
const Customer = require("../models/customers");
const sendAWSEmail = require("../utils/aws-ses");


module.exports = class OrderService {
    
    static async getAllOrders() {
        const allOrders = await CoffeeOrder.selectAllOrders()

        return {details: "all orders in db", data: allOrders};
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


        const sendEmail = sendAWSEmail(coffeeType, quantity)


        return {details: "order processed", data: newOrder}

    }

    static async getOneOrder(id) {

    }

    static async getOrdersByCustomer(id) {
        const allOrders = await CoffeeOrder.selectOrdersByCustomer(id)

        if (allOrders.length === 0){
            return {success: false, details: `no orders found or customer does not exist for customer_id: ${id}`}
        }

        return {details: `all orders for customer_id: ${id}`, data: allOrders};
    }

    static async updateOneOrder({id}, {coffeeType, quantity, subscription}) {
        const updatedOrder = await CoffeeOrder.updateSingleOrder(id, coffeeType, quantity, subscription)

        return updatedOrder



    }

    static async deleteOneOrder(id) {

    }


    };
