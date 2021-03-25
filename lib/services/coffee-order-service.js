const CoffeeOrder = require("../models/coffee-order");


module.exports = class OrderService {
    
    static async getAllOrders() {
        const allOrders = await CoffeeOrder.selectAllOrders()

        return allOrders;
    }

    static async create({ quantity }) {

    }

    static async getOneOrder(id) {

    }

    static async updateOneOrder(quantity, id) {

    }

    static async deleteOneOrder(id) {

    }


    };
