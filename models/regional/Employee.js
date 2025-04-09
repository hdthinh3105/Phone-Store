const sql = require('mssql');
const { regionalConfigs } = require('../../config/database');

class Employee {
  static async getAll(region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      console.log('Database config:', regionalConfigs[region]);
      
      // Đóng kết nối cũ nếu có
      await sql.close();
      
      // Tạo kết nối mới
      pool = await sql.connect(regionalConfigs[region]);
      const result = await pool.request().execute('sp_GetAllEmployees');
      return result.recordset;
    } catch (err) {
      console.error('Error in getAll:', err);
      throw err;
    } finally {
      // Đóng kết nối sau khi hoàn thành
      if (pool) {
        await pool.close();
      }
    }
  }

  static async getById(id, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      
      // Đóng kết nối cũ nếu có
      await sql.close();
      
      // Tạo kết nối mới
      pool = await sql.connect(regionalConfigs[region]);
      const result = await pool.request()
        .input('MaNV', sql.Int, id)
        .execute('sp_GetEmployeeById');
      return result.recordset[0];
    } catch (err) {
      console.error('Error in getById:', err);
      throw err;
    } finally {
      // Đóng kết nối sau khi hoàn thành
      if (pool) {
        await pool.close();
      }
    }
  }

  static async create(employee, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      
      // Đóng kết nối cũ nếu có
      await sql.close();
      
      // Tạo kết nối mới
      pool = await sql.connect(regionalConfigs[region]);
      const { MaNV, TenNV, ChucVu, GioiTinh, NgaySinh, NgayBatDauLamViec, DiaChi, ThanhPho, Mien, SoDienThoai, GhiChu, QuanLy, MaCN } = employee;
      await pool.request()
        .input('MaNV', sql.Int, MaNV)
        .input('TenNV', sql.NVarChar(250), TenNV)
        .input('ChucVu', sql.NVarChar(250), ChucVu)
        .input('GioiTinh', sql.NVarChar(50), GioiTinh)
        .input('NgaySinh', sql.DateTime, NgaySinh)
        .input('NgayBatDauLamViec', sql.DateTime, NgayBatDauLamViec)
        .input('DiaChi', sql.NVarChar(250), DiaChi)
        .input('ThanhPho', sql.NVarChar(15), ThanhPho)
        .input('Mien', sql.NVarChar(15), Mien)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .input('GhiChu', sql.NVarChar(sql.MAX), GhiChu)
        .input('QuanLy', sql.Int, QuanLy)
        .input('MaCN', sql.Int, MaCN)
        .execute('sp_CreateEmployee');
    } catch (err) {
      console.error('Error in create:', err);
      throw err;
    } finally {
      // Đóng kết nối sau khi hoàn thành
      if (pool) {
        await pool.close();
      }
    }
  }

  static async update(id, employee, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      
      // Đóng kết nối cũ nếu có
      await sql.close();
      
      // Tạo kết nối mới
      pool = await sql.connect(regionalConfigs[region]);
      const { TenNV, ChucVu, GioiTinh, NgaySinh, NgayBatDauLamViec, DiaChi, ThanhPho, Mien, SoDienThoai, GhiChu, QuanLy, MaCN } = employee;
      await pool.request()
        .input('MaNV', sql.Int, id)
        .input('TenNV', sql.NVarChar(250), TenNV)
        .input('ChucVu', sql.NVarChar(250), ChucVu)
        .input('GioiTinh', sql.NVarChar(50), GioiTinh)
        .input('NgaySinh', sql.DateTime, NgaySinh)
        .input('NgayBatDauLamViec', sql.DateTime, NgayBatDauLamViec)
        .input('DiaChi', sql.NVarChar(250), DiaChi)
        .input('ThanhPho', sql.NVarChar(15), ThanhPho)
        .input('Mien', sql.NVarChar(15), Mien)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .input('GhiChu', sql.NVarChar(sql.MAX), GhiChu)
        .input('QuanLy', sql.Int, QuanLy)
        .input('MaCN', sql.Int, MaCN)
        .execute('sp_UpdateEmployee');
    } catch (err) {
      console.error('Error in update:', err);
      throw err;
    } finally {
      // Đóng kết nối sau khi hoàn thành
      if (pool) {
        await pool.close();
      }
    }
  }

  static async delete(id, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      
      // Đóng kết nối cũ nếu có
      await sql.close();
      
      // Tạo kết nối mới
      pool = await sql.connect(regionalConfigs[region]);
      await pool.request()
        .input('MaNV', sql.Int, id)
        .execute('sp_DeleteEmployee');
    } catch (err) {
      console.error('Error in delete:', err);
      throw err;
    } finally {
      // Đóng kết nối sau khi hoàn thành
      if (pool) {
        await pool.close();
      }
    }
  }
}

module.exports = Employee;