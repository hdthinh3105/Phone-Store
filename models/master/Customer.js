const sql = require('mssql');
const { masterConfig } = require('../../config/database');

class Customer {
  static async getAll() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().execute('sp_GetAllCustomers');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaKH', sql.NChar(250), id)
        .execute('sp_GetCustomerById');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(customer) {
    try {
      const pool = await sql.connect(masterConfig);
      const { MaKH, TenKH, NgaySinh, GioiTinh, DiaChi, ThanhPho, Mien, SoDienThoai } = customer;
      await pool.request()
        .input('MaKH', sql.NChar(250), MaKH)
        .input('TenKH', sql.NVarChar(250), TenKH)
        .input('NgaySinh', sql.DateTime, NgaySinh)
        .input('GioiTinh', sql.NVarChar(50), GioiTinh)
        .input('DiaChi', sql.NVarChar(60), DiaChi)
        .input('ThanhPho', sql.NVarChar(15), ThanhPho)
        .input('Mien', sql.NVarChar(15), Mien)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .execute('sp_CreateCustomer');
    } catch (err) {
      throw err;
    }
  }

  static async update(id, customer) {
    try {
      const pool = await sql.connect(masterConfig);
      const { TenKH, NgaySinh, GioiTinh, DiaChi, ThanhPho, Mien, SoDienThoai } = customer;
      await pool.request()
        .input('MaKH', sql.NChar(250), id)
        .input('TenKH', sql.NVarChar(250), TenKH)
        .input('NgaySinh', sql.DateTime, NgaySinh)
        .input('GioiTinh', sql.NVarChar(50), GioiTinh)
        .input('DiaChi', sql.NVarChar(60), DiaChi)
        .input('ThanhPho', sql.NVarChar(15), ThanhPho)
        .input('Mien', sql.NVarChar(15), Mien)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .execute('sp_UpdateCustomer');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(masterConfig);
      await pool.request()
        .input('MaKH', sql.NChar(250), id)
        .execute('sp_DeleteCustomer');
    } catch (err) {
      throw err;
    }
  }

  static async search(keyword) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('keyword', sql.NVarChar(250), keyword)
        .execute('sp_SearchCustomers');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Customer;