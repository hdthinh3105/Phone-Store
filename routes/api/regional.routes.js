const express = require('express');
const router = express.Router();
const BranchController = require('../../controllers/regional/BranchController');
const EmployeeController = require('../../controllers/regional/EmployeeController');
const OrderController = require('../../controllers/regional/OrderController');
const OrderDetailController = require('../../controllers/regional/OrderDetailController');
const StatisticsController = require('../../controllers/regional/StatisticsController');

// Branch routes
router.get('/branches', BranchController.getAll);
router.get('/branches/:id', BranchController.getById);
router.post('/branches', BranchController.create);
router.put('/branches/:id', BranchController.update);
router.delete('/branches/:id', BranchController.delete);

// Employee routes
router.get('/employees', EmployeeController.getAll);
router.get('/employees/:id', EmployeeController.getById);
router.post('/employees', EmployeeController.create);
router.put('/employees/:id', EmployeeController.update);
router.delete('/employees/:id', EmployeeController.delete);

// Order routes
router.post('/orders', OrderController.create);
router.get('/orders/:id', OrderController.getById);
router.put('/orders/:id', OrderController.update);
router.get('/orders/history', OrderController.getOrderHistory);

// Order Detail routes
router.get('/orders/:orderId/details', OrderDetailController.getByOrderId);
router.post('/orders/details', OrderDetailController.create);
router.put('/orders/details/:orderId/:productId', OrderDetailController.update);
router.delete('/orders/details/:orderId/:productId', OrderDetailController.delete);

// Statistics routes
router.get('/statistics/sales', StatisticsController.getSalesStatistics);
router.get('/statistics/customers', StatisticsController.getCustomerStatistics);
router.get('/statistics/products', StatisticsController.getProductStatistics);

module.exports = router;