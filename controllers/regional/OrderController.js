const OrderService = require('../../services/regional/OrderService');

class OrderController {
  // Tạo đơn hàng mới
  static async create(req, res) {
    try {
      await OrderService.createOrder(req.body);
      res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Lấy thông tin đơn hàng theo ID
  static async getById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Lấy tất cả đơn hàng
  static async getAll(req, res) {
    const limit = parseInt(req.query.limit) || 10; // Mặc định là 10
    const offset = parseInt(req.query.offset) || 0; // Mặc định là 0
    try {
      const orders = await OrderService.getAllOrders(limit, offset);
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Cập nhật trạng thái đơn hàng
  static async update(req, res) {
    try {
      await OrderService.updateOrderStatus(req.params.id, req.body);
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Xóa đơn hàng
  static async delete(req, res) {
    try {
      await OrderService.deleteOrder(req.params.id);
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Lấy lịch sử đơn hàng
  static async getOrderHistory(req, res) {
    try {
      const history = await OrderService.getOrderHistory(req.user.id); // Giả sử ID người dùng có sẵn trong req.user
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = OrderController;