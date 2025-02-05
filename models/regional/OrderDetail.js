const sql = require('mssql');
const { regionalConfigs } = require('../../config/database');

class OrderDetail {
  static async getAll() {
    try {
      const pool = await sql.connect(regionalConfigs.north); // Hoặc south tùy theo chi nhánh
      const result = await pool.request().query('SELECT * FROM ChiTietDonHang');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(orderId, productId) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const result = await pool.request()
        .input('MaDH', sql.Int, orderId)
        .input('MaSP', sql.Int, productId)
        .query('SELECT * FROM ChiTietDonHang WHERE MaDH = @MaDH AND MaSP = @MaSP');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(orderDetail) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const { MaDH, MaSP, ThanhTien, SoLuong, GiamGia } = orderDetail;
      await pool.request()
        .input('MaDH', sql.Int, MaDH)
        .input('MaSP', sql.Int, MaSP)
        .input('ThanhTien', sql.Money, ThanhTien)
        .input('SoLuong', sql.SmallInt, SoLuong)
        .input('GiamGia', sql.Real, GiamGia)
        .query('INSERT INTO ChiTietDonHang (MaDH, MaSP, ThanhTien, SoLuong, GiamGia) VALUES (@MaDH, @MaSP, @ThanhTien, @SoLuong, @GiamGia)');
    } catch (err) {
      throw err;
    }
  }

  static async update(orderId, productId, orderDetail) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const { ThanhTien, SoLuong, GiamGia } = orderDetail;
      await pool.request()
        .input('MaDH', sql.Int, orderId)
        .input('MaSP', sql.Int, productId)
        .input('ThanhTien', sql.Money, ThanhTien)
        .input('SoLuong', sql.SmallInt, SoLuong)
        .input('GiamGia', sql.Real, GiamGia)
        .query('UPDATE ChiTietDonHang SET ThanhTien = @ThanhTien, SoLuong = @SoLuong, GiamGia = @GiamGia WHERE MaDH = @MaDH AND MaSP = @MaSP');
    } catch (err) {
      throw err;
    }
  }

  static async delete(orderId, productId) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      await pool.request()
        .input('MaDH', sql.Int, orderId)
        .input('MaSP', sql.Int, productId)
        .query('DELETE FROM ChiTietDonHang WHERE MaDH = @MaDH AND MaSP = @MaSP');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderDetail;