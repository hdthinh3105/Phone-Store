const dashboardService = require('../services/dashboardService');

class DashboardController {
    // Regional controllers
    async countRegionalOrders(req, res) {
        try {
            const { region } = req.query;
            const result = await dashboardService.getRegionalOrdersCount(region);
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    async countRegionalEmployees(req, res) {
        try {
            const { region } = req.query;
            const result = await dashboardService.getRegionalEmployeesCount(region);
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    async getRegionalTotalSales(req, res) {
        try {
            const { region } = req.query;
            const result = await dashboardService.getRegionalTotalSales(region);
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    async getMonthlySales(req, res) {
        try {
            const { region } = req.query;
            const year = parseInt(req.query.year) || new Date().getFullYear(); // Lấy năm từ query hoặc năm hiện tại
            const result = await dashboardService.getMonthlySalesData(region, year);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Master controllers
    async countMasterCustomers(req, res) {
        try {
            const result = await dashboardService.getMasterCustomersCount();
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    async countMasterProducts(req, res) {
        try {
            const result = await dashboardService.getMasterProductsCount();
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    async countMasterSuppliers(req, res) {
        try {
            const result = await dashboardService.getMasterSuppliersCount();
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    async countMasterShippers(req, res) {
        try {
            const result = await dashboardService.getMasterShippersCount();
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
}

module.exports = new DashboardController(); 