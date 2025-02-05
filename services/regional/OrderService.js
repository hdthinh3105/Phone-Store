const Order = require('../../models/regional/Order');

class OrderService {
  static async createOrder(order) {
    await Order.create(order);
  }

  static async getOrderById(id) {
    return await Order.getById(id);
  }

  static async updateOrderStatus(id, status) {
    await Order.updateStatus(id, status);
  }

  static async getOrderHistory(customerId) {
    return await Order.getHistory(customerId);
  }
}

module.exports = OrderService;