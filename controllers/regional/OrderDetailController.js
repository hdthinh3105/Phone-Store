const OrderDetailService = require('../../services/regional/OrderDetailService');

class OrderDetailController {
  static async getByOrderId(req, res) {
    try {
      const orderDetails = await OrderDetailService.getOrderDetailsByOrderId(req.params.orderId);
      res.status(200).json(orderDetails);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    try {
      await OrderDetailService.createOrderDetail(req.body);
      res.status(201).json({ message: 'Order detail created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      await OrderDetailService.updateOrderDetail(req.params.orderId, req.params.productId, req.body);
      res.status(200).json({ message: 'Order detail updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await OrderDetailService.deleteOrderDetail(req.params.orderId, req.params.productId);
      res.status(200).json({ message: 'Order detail deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = OrderDetailController;