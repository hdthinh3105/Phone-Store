const sql = require('mssql');
const { masterConfig } = require('../../config/database');

class Product {
  static async getAll() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().execute('sp_GetAllProducts');
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
        .execute('sp_GetProductById');
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
        .execute('sp_CreateProduct');
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
        .execute('sp_UpdateProduct');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(masterConfig);
      await pool.request()
        .input('MaSP', sql.Int, id)
        .execute('sp_DeleteProduct');
    } catch (err) {
      throw err;
    }
  }

  static async search(keyword) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('keyword', sql.NVarChar(250), keyword)
        .execute('sp_SearchProducts');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;