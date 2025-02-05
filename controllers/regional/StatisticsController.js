const StatisticsService = require('../../services/regional/StatisticsService');

class StatisticsController {
  static async getSalesStatistics(req, res) {
    try {
      const salesData = await StatisticsService.getSalesStatistics();
      res.status(200).json(salesData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getCustomerStatistics(req, res) {
    try {
      const customerData = await StatisticsService.getCustomerStatistics();
      res.status(200).json(customerData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductStatistics(req, res) {
    try {
      const productData = await StatisticsService.getProductStatistics();
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = StatisticsController;