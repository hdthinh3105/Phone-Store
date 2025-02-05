const OrderService = require('../../services/regional/OrderService');

class OrderController {
  static async create(req, res) {
    try {
      await OrderService.createOrder(req.body);
      res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

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

  static async update(req, res) {
    try {
      await OrderService.updateOrderStatus(req.params.id, req.body.status);
      res.status(200).json({ message: 'Order status updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getOrderHistory(req, res) {
    try {
      const history = await OrderService.getOrderHistory(req.user.id); // Assuming user ID is available in req.user
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = OrderController;