const StatisticsService = require('../../services/regional/StatisticsService');

class StatisticsController {
  static async getSalesStatistics(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Controller - Region:', region);
      const salesData = await StatisticsService.getSalesStatistics(region);
      res.status(200).json(salesData);
    } catch (err) {
      console.error('Error in getSalesStatistics:', err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getCustomerStatistics(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Controller - Region:', region);
      const customerData = await StatisticsService.getCustomerStatistics(region);
      res.status(200).json(customerData);
    } catch (err) {
      console.error('Error in getCustomerStatistics:', err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductStatistics(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Controller - Region:', region);
      const productData = await StatisticsService.getProductStatistics(region);
      res.status(200).json(productData);
    } catch (err) {
      console.error('Error in getProductStatistics:', err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = StatisticsController;