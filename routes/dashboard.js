const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Regional routes
router.get('/regional/orders/count', dashboardController.countRegionalOrders.bind(dashboardController));
router.get('/regional/employees/count', dashboardController.countRegionalEmployees.bind(dashboardController));
router.get('/regional/orders/total-sales', dashboardController.getRegionalTotalSales.bind(dashboardController));
router.get('/regional/sales/monthly', dashboardController.getMonthlySales.bind(dashboardController));

// Master routes
router.get('/master/customers/count', dashboardController.countMasterCustomers.bind(dashboardController));
router.get('/master/products/count', dashboardController.countMasterProducts.bind(dashboardController));
router.get('/master/suppliers/count', dashboardController.countMasterSuppliers.bind(dashboardController));
router.get('/master/shippers/count', dashboardController.countMasterShippers.bind(dashboardController));

module.exports = router; 