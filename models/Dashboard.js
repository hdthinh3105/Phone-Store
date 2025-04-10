const sql = require('mssql');
const { masterConfig, regionalConfigs } = require('../config/database');

class Dashboard {
    // Regional methods
    static async countRegionalOrders(region) {
        const pool = await sql.connect(regionalConfigs[region]);
        try {
            const result = await pool.request()
                .execute('sp_CountRegionalOrders');
            return result.recordset[0].totalOrders || 0;
        } catch (err) {
            console.error('Error in countRegionalOrders:', err);
            throw err;
        } finally {
            pool.close();
        }
    }

    static async countRegionalEmployees(region) {
        const pool = await sql.connect(regionalConfigs[region]);
        try {
            const result = await pool.request()
                .execute('sp_CountRegionalEmployees');
            return result.recordset[0].totalEmployees || 0;
        } catch (err) {
            console.error('Error in countRegionalEmployees:', err);
            throw err;
        } finally {
            pool.close();
        }
    }

    static async getRegionalTotalSales(region) {
        const pool = await sql.connect(regionalConfigs[region]);
        try {
            const result = await pool.request()
                .execute('sp_GetRegionalTotalSales');
            return {
                totalSales: result.recordset[0].totalSales || 0,
                orderCount: result.recordset[0].orderCount || 0,
                currentMonth: new Date().getMonth() + 1,
                currentYear: new Date().getFullYear()
            };
        } catch (err) {
            console.error('Error in getRegionalTotalSales:', err);
            throw err;
        } finally {
            pool.close();
        }
    }

    static async getMonthlySales(region, year) {
        const pool = await sql.connect(regionalConfigs[region]);
        try {
            const result = await pool.request()
                .input('Year', sql.Int, year)
                .execute('sp_GetMonthlySales');
            return result.recordset;
        } catch (err) {
            console.error(`Error in getMonthlySales for region ${region}:`, err);
            throw err;
        } finally {
            pool.close();
        }
    }

    // Master methods
    static async countMasterCustomers() {
        const pool = await sql.connect(masterConfig);
        try {
            const result = await pool.request()
                .execute('sp_CountMasterCustomers');
            return result.recordset[0]?.totalCustomers || 0;
        } catch (err) {
            console.error('Error in countMasterCustomers:', err);
            throw err;
        } finally {
            pool.close();
        }
    }

    static async countMasterProducts() {
        const pool = await sql.connect(masterConfig);
        try {
            const result = await pool.request()
                .execute('sp_CountMasterProducts');
            return result.recordset[0].totalProducts || 0;
        } catch (err) {
            console.error('Error in countMasterProducts:', err);
            throw err;
        } finally {
            pool.close();
        }
    }

    static async countMasterSuppliers() {
        const pool = await sql.connect(masterConfig);
        try {
            const result = await pool.request()
                .execute('sp_CountMasterSuppliers');
            return result.recordset[0].totalSuppliers || 0;
        } catch (err) {
            console.error('Error in countMasterSuppliers:', err);
            throw err;
        } finally {
            pool.close();
        }
    }

    static async countMasterShippers() {
        const pool = await sql.connect(masterConfig);
        try {
            const result = await pool.request()
                .execute('sp_CountMasterShippers');
            return result.recordset[0].totalShippers || 0;
        } catch (err) {
            console.error('Error in countMasterShippers:', err);
            throw err;
        } finally {
            pool.close();
        }
    }
}

module.exports = Dashboard; 