const Statistics = require('../../models/regional/Statistics');

class StatisticsService {
  static async getSalesStatistics() {
    return await Statistics.getSalesData();
  }

  static async getCustomerStatistics() {
    return await Statistics.getCustomerData();
  }

  static async getProductStatistics() {
    return await Statistics.getProductData();
  }
}

module.exports = StatisticsService;