const OrderDetail = require('../../models/regional/OrderDetail');

class OrderDetailService {
  static async getOrderDetailsByOrderId(orderId) {
    return await OrderDetail.getByOrderId(orderId);
  }

  static async createOrderDetail(orderDetail) {
    await OrderDetail.create(orderDetail);
  }

  static async updateOrderDetail(id, orderDetail) {
    await OrderDetail.update(id, orderDetail);
  }

  static async deleteOrderDetail(id) {
    await OrderDetail.delete(id);
  }
}

module.exports = OrderDetailService;