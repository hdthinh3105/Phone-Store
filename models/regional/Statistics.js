// models/regional/Statistics.js
const sql = require('mssql');
const { regionalConfigs } = require('../../config/database');

class Statistics {
  static async getSalesData() {
    // Logic để lấy dữ liệu doanh thu
    const pool = await sql.connect(regionalConfigs.north); // Hoặc south tùy theo chi nhánh
    const result = await pool.request().query('SELECT * FROM SalesData'); // Thay thế bằng truy vấn thực tế
    return result.recordset;
  }

  static async getCustomerData() {
    // Logic để lấy dữ liệu khách hàng
    const pool = await sql.connect(regionalConfigs.north);
    const result = await pool.request().query('SELECT * FROM CustomerData'); // Thay thế bằng truy vấn thực tế
    return result.recordset;
  }

  static async getProductData() {
    // Logic để lấy dữ liệu sản phẩm
    const pool = await sql.connect(regionalConfigs.north);
    const result = await pool.request().query('SELECT * FROM ProductData'); // Thay thế bằng truy vấn thực tế
    return result.recordset;
  }
}

module.exports = Statistics;