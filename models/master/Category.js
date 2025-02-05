const sql = require('mssql');
const { masterConfig } = require('../../config/database');

class Category {
  static async getAll() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().query('SELECT * FROM LoaiSanPham');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaLoaiSP', sql.Int, id)
        .query('SELECT * FROM LoaiSanPham WHERE MaLoaiSP = @MaLoaiSP');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(category) {
    try {
      const pool = await sql.connect(masterConfig);
      const { MaLoaiSP, TenLoaiSP, MoTa } = category;
      await pool.request()
        .input('MaLoaiSP', sql.Int, MaLoaiSP)
        .input('TenLoaiSP', sql.NVarChar(15), TenLoaiSP)
        .input('MoTa', sql.NVarChar(sql.MAX), MoTa)
        .query('INSERT INTO LoaiSanPham (MaLoaiSP, TenLoaiSP, MoTa) VALUES (@MaLoaiSP, @TenLoaiSP, @MoTa)');
    } catch (err) {
      throw err;
    }
  }

  static async update(id, category) {
    try {
      const pool = await sql.connect(masterConfig);
      const { TenLoaiSP, MoTa } = category;
      await pool.request()
        .input('MaLoaiSP', sql.Int, id)
        .input('TenLoaiSP', sql.NVarChar(15), TenLoaiSP)
        .input('MoTa', sql.NVarChar(sql.MAX), MoTa)
        .query('UPDATE LoaiSanPham SET TenLoaiSP = @TenLoaiSP, MoTa = @MoTa WHERE MaLoaiSP = @MaLoaiSP');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(masterConfig);
      await pool.request()
        .input('MaLoaiSP', sql.Int, id)
        .query('DELETE FROM LoaiSanPham WHERE MaLoaiSP = @MaLoaiSP');
    } catch (err) {
      throw err;
    }
  }

  static async search(keyword) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('keyword', sql.NVarChar(15), `%${keyword}%`)
        .query('SELECT * FROM LoaiSanPham WHERE TenLoaiSP LIKE @keyword');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Category;