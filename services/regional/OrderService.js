const Order = require('../../models/regional/Order');

class OrderService {
  // Tạo đơn hàng mới
  static async createOrder(order) {
    await Order.create(order);
  }

  // Lấy thông tin đơn hàng theo ID
  static async getOrderById(id) {
    return await Order.getById(id);
  }

  // Lấy tất cả đơn hàng
  static async getAllOrders(limit = 10, offset = 0) {
    return await Order.getAll(limit, offset);
  }

  // Cập nhật trạng thái đơn hàng
  static async updateOrderStatus(id, orderData) {
    await Order.update(id, orderData);
  }

  // Xóa đơn hàng
  static async deleteOrder(id) {
    await Order.delete(id);
  }

  // Lấy lịch sử đơn hàng
  static async getOrderHistory(customerId) {
    return await Order.getHistory(customerId); // Bạn cần thêm phương thức này trong Order model
  }
}

module.exports = OrderService;