const sql = require('mssql');
const { regionalConfigs } = require('../../config/database');

class Order {
  static async getAll() {
    try {
      const pool = await sql.connect(regionalConfigs.north); // Hoặc south tùy theo chi nhánh
      const result = await pool.request().query('SELECT * FROM DonHang');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const result = await pool.request()
        .input('MaDH', sql.Int, id)
        .query('SELECT * FROM DonHang WHERE MaDH = @MaDH');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(order) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const { MaKH, MaNV, NgayDatHang, MaNVC, TenNguoiNhan, DiaChiNhan, ThanhPhoNhan, MaCN } = order;
      const result = await pool.request()
        .input('MaKH', sql.NChar(250), MaKH)
        .input('MaNV', sql.Int, MaNV)
        .input('NgayDatHang', sql.DateTime, NgayDatHang)
        .input('MaNVC', sql.Int, MaNVC)
        .input('TenNguoiNhan', sql.NVarChar(250), TenNguoiNhan)
        .input('DiaChiNhan', sql.NVarChar(250), DiaChiNhan)
        .input('ThanhPhoNhan', sql.NVarChar(100), ThanhPhoNhan)
        .input('MaCN', sql.Int, MaCN)
        .query('INSERT INTO DonHang (MaKH, MaNV, NgayDatHang, MaNVC, TenNguoiNhan, DiaChiNhan, ThanhPhoNhan, MaCN) VALUES (@MaKH, @MaNV, @NgayDatHang, @MaNVC, @TenNguoiNhan, @DiaChiNhan, @ThanhPhoNhan, @MaCN)');
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, order) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const { MaKH, MaNV, NgayDatHang, MaNVC, TenNguoiNhan, DiaChiNhan, ThanhPhoNhan, MaCN } = order;
      await pool.request()
        .input('MaDH', sql.Int, id)
        .input('MaKH', sql.NChar(250), MaKH)
        .input('MaNV', sql.Int, MaNV)
        .input('NgayDatHang', sql.DateTime, NgayDatHang)
        .input('MaNVC', sql.Int, MaNVC)
        .input('TenNguoiNhan', sql.NVarChar(250), TenNguoiNhan)
        .input('DiaChiNhan', sql.NVarChar(250), DiaChiNhan)
        .input('ThanhPhoNhan', sql.NVarChar(100), ThanhPhoNhan)
        .input('MaCN', sql.Int, MaCN)
        .query('UPDATE DonHang SET MaKH = @MaKH, MaNV = @MaNV, NgayDatHang = @NgayDatHang, MaNVC = @MaNVC, TenNguoiNhan = @TenNguoiNhan, DiaChiNhan = @DiaChiNhan, ThanhPhoNhan = @ThanhPhoNhan, MaCN = @MaCN WHERE MaDH = @MaDH');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      await pool.request()
        .input('MaDH', sql.Int, id)
        .query('DELETE FROM DonHang WHERE MaDH = @MaDH');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Order;