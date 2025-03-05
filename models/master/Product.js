const sql = require('mssql');
const { masterConfig } = require('../../config/database');

class Product {
  static async getAll() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().query('SELECT * FROM TrungTam.dbo.SanPham');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaSP', sql.Int, id)
        .query('SELECT * FROM TrungTam.dbo.SanPham WHERE MaSP = @MaSP');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(product) {
    try {
      const pool = await sql.connect(masterConfig);
      const { MaSP, TenSP, MaNCC, MaLoaiSP, ThanhTien, SoLuongTonKho, SoLuongDatMua, MucDatHangLai, TrangThaiNgungBan } = product;
      await pool.request()
        .input('MaSP', sql.Int, MaSP)
        .input('TenSP', sql.NVarChar(250), TenSP)
        .input('MaNCC', sql.Int, MaNCC)
        .input('MaLoaiSP', sql.Int, MaLoaiSP)
        .input('ThanhTien', sql.Money, ThanhTien)
        .input('SoLuongTonKho', sql.SmallInt, SoLuongTonKho)
        .input('SoLuongDatMua', sql.SmallInt, SoLuongDatMua)
        .input('MucDatHangLai', sql.SmallInt, MucDatHangLai)
        .input('TrangThaiNgungBan', sql.Bit, TrangThaiNgungBan)
        .query('INSERT INTO TrungTam.dbo.SanPham (MaSP, TenSP, MaNCC, MaLoaiSP, ThanhTien, SoLuongTonKho, SoLuongDatMua, MucDatHangLai, TrangThaiNgungBan) VALUES (@MaSP, @TenSP, @MaNCC, @MaLoaiSP, @ThanhTien, @SoLuongTonKho, @SoLuongDatMua, @MucDatHangLai, @TrangThaiNgungBan)');
    } catch (err) {
      throw err;
    }
  }

  static async update(id, product) {
    try {
      const pool = await sql.connect(masterConfig);
      const { TenSP, MaNCC, MaLoaiSP, ThanhTien, SoLuongTonKho, SoLuongDatMua, MucDatHangLai, TrangThaiNgungBan } = product;
      await pool.request()
        .input('MaSP', sql.Int, id)
        .input('TenSP', sql.NVarChar(250), TenSP)
        .input('MaNCC', sql.Int, MaNCC)
        .input('MaLoaiSP', sql.Int, MaLoaiSP)
        .input('ThanhTien', sql.Money, ThanhTien)
        .input('SoLuongTonKho', sql.SmallInt, SoLuongTonKho)
        .input('SoLuongDatMua', sql.SmallInt, SoLuongDatMua)
        .input('MucDatHangLai', sql.SmallInt, MucDatHangLai)
        .input('TrangThaiNgungBan', sql.Bit, TrangThaiNgungBan)
        .query('UPDATE TrungTam.dbo.SanPham SET TenSP = @TenSP, MaNCC = @MaNCC, MaLoaiSP = @MaLoaiSP, ThanhTien = @ThanhTien, SoLuongTonKho = @SoLuongTonKho, SoLuongDatMua = @SoLuongDatMua, MucDatHangLai = @MucDatHangLai, TrangThaiNgungBan = @TrangThaiNgungBan WHERE MaSP = @MaSP');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(masterConfig);
      await pool.request()
        .input('MaSP', sql.Int, id)
        .query('DELETE FROM TrungTam.dbo.SanPham WHERE MaSP = @MaSP');
    } catch (err) {
      throw err;
    }
  }

  static async search(keyword) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('keyword', sql.NVarChar(250), `%${keyword}%`)
        .query('SELECT * FROM TrungTam.dbo.SanPham WHERE TenSP LIKE @keyword');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;