const Dashboard = require('../models/Dashboard');

class DashboardService {
    // Regional services
    async getRegionalOrdersCount(region) {
        try {
            const count = await Dashboard.countRegionalOrders(region);
            return { success: true, data: { totalOrders: count } };
        } catch (error) {
            console.error('Error in getRegionalOrdersCount:', error);
            throw new Error('Lỗi khi đếm đơn hàng');
        }
    }

    async getRegionalEmployeesCount(region) {
        try {
            const count = await Dashboard.countRegionalEmployees(region);
            return { success: true, data: { totalEmployees: count } };
        } catch (error) {
            console.error('Error in getRegionalEmployeesCount:', error);
            throw new Error('Lỗi khi đếm nhân viên');
        }
    }

    async getRegionalTotalSales(region) {
        try {
            const data = await Dashboard.getRegionalTotalSales(region);
            return { 
                success: true, 
                data: {
                    ...data,
                    monthName: this.getMonthName(data.currentMonth)
                }
            };
        } catch (error) {
            console.error('Error in getRegionalTotalSales:', error);
            throw new Error('Lỗi khi lấy doanh số');
        }
    }

    getMonthName(month) {
        const months = [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
            'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
            'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];
        return months[month - 1];
    }

    async getMonthlySalesData(region, year) {
        try {
            const monthlyData = await Dashboard.getMonthlySales(region, year);
            // Định dạng lại dữ liệu thành mảng 12 giá trị doanh số
            const salesArray = Array(12).fill(0); // Khởi tạo mảng 12 số 0
            monthlyData.forEach(item => {
                if (item.Thang >= 1 && item.Thang <= 12) {
                    // Chia cho 1 triệu để đơn vị là triệu
                    salesArray[item.Thang - 1] = item.TongDoanhSo / 1000000; 
                }
            });
            return { success: true, data: salesArray };
        } catch (error) {
            console.error('Error in getMonthlySalesData:', error);
            throw new Error('Lỗi khi lấy dữ liệu doanh số hàng tháng');
        }
    }

    // Master services
    async getMasterCustomersCount() {
        try {
            const count = await Dashboard.countMasterCustomers();
            return { 
                success: true, 
                data: { totalCustomers: count } 
            };
        } catch (error) {
            console.error('Error in getMasterCustomersCount:', error);
            throw new Error('Lỗi khi đếm khách hàng');
        }
    }

    async getMasterProductsCount() {
        try {
            const count = await Dashboard.countMasterProducts();
            return { success: true, data: { totalProducts: count } };
        } catch (error) {
            console.error('Error in getMasterProductsCount:', error);
            throw new Error('Lỗi khi đếm sản phẩm');
        }
    }

    async getMasterSuppliersCount() {
        try {
            const count = await Dashboard.countMasterSuppliers();
            return { success: true, data: { totalSuppliers: count } };
        } catch (error) {
            console.error('Error in getMasterSuppliersCount:', error);
            throw new Error('Lỗi khi đếm nhà cung cấp');
        }
    }

    async getMasterShippersCount() {
        try {
            const count = await Dashboard.countMasterShippers();
            return { success: true, data: { totalShippers: count } };
        } catch (error) {
            console.error('Error in getMasterShippersCount:', error);
            throw new Error('Lỗi khi đếm đơn vị vận chuyển');
        }
    }
}

module.exports = new DashboardService(); 