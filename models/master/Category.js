const sql = require('mssql');
const { masterConfig } = require('../../config/database');

class Category {
  static async getAll() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().execute('sp_GetAllCategories');
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
        .execute('sp_GetCategoryById');
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
        .execute('sp_CreateCategory');
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
        .execute('sp_UpdateCategory');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(masterConfig);
      await pool.request()
        .input('MaLoaiSP', sql.Int, id)
        .execute('sp_DeleteCategory');
    } catch (err) {
      throw err;
    }
  }

  static async search(keyword) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('keyword', sql.NVarChar(15), keyword)
        .execute('sp_SearchCategories');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Category;