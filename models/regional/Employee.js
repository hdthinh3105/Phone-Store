const sql = require('mssql');
const { regionalConfigs } = require('../../config/database');

class Employee {
  static async getAll() {
    try {
      const pool = await sql.connect(regionalConfigs.north); // Hoặc south tùy theo chi nhánh
      const result = await pool.request().query('SELECT * FROM NhanVien');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const result = await pool.request()
        .input('MaNV', sql.Int, id)
        .query('SELECT * FROM NhanVien WHERE MaNV = @MaNV');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(employee) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
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
        .query('INSERT INTO NhanVien (MaNV, TenNV, ChucVu, GioiTinh, NgaySinh, NgayBatDauLamViec, DiaChi, ThanhPho, Mien, SoDienThoai, GhiChu, QuanLy, MaCN) VALUES (@MaNV, @TenNV, @ChucVu, @GioiTinh, @NgaySinh, @NgayBatDauLamViec, @DiaChi, @ThanhPho, @Mien, @SoDienThoai, @GhiChu, @QuanLy, @MaCN)');
    } catch (err) {
      throw err;
    }
  }

  static async update(id, employee) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
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
        .query('UPDATE NhanVien SET TenNV = @TenNV, ChucVu = @ChucVu, GioiTinh = @GioiTinh, NgaySinh = @NgaySinh, NgayBatDauLamViec = @NgayBatDauLamViec, DiaChi = @DiaChi, ThanhPho = @ThanhPho, Mien = @Mien, SoDienThoai = @SoDienThoai, GhiChu = @GhiChu, QuanLy = @QuanLy, MaCN = @MaCN WHERE MaNV = @MaNV ```javascript');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      await pool.request()
        .input('MaNV', sql.Int, id)
        .query('DELETE FROM NhanVien WHERE MaNV = @MaNV');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Employee;