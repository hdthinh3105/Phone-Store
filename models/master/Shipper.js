const sql = require('mssql');
const { masterConfig } = require('../../config/database');

class Shipper {
  static async getAll() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().execute('sp_GetAllShippers');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaNVC', sql.Int, id)
        .execute('sp_GetShipperById');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(shipper) {
    try {
      const pool = await sql.connect(masterConfig);
      const { MaNVC, TenCongTy, SoDienThoai } = shipper;
      await pool.request()
        .input('MaNVC', sql.Int, MaNVC)
        .input('TenCongTy', sql.NVarChar(250), TenCongTy)
        .input('SoDienThoai', sql.NVarChar(10), SoDienThoai)
        .execute('sp_CreateShipper');
    } catch (err) {
      throw err;
    }
  }

  static async update(id, shipper) {
    try {
      const pool = await sql.connect(masterConfig);
      const { TenCongTy, SoDienThoai } = shipper;
      await pool.request()
        .input('MaNVC', sql.Int, id)
        .input('TenCongTy', sql.NVarChar(250), TenCongTy)
        .input('SoDienThoai', sql.NVarChar(10), SoDienThoai)
        .execute('sp_UpdateShipper');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(masterConfig);
      await pool.request()
        .input('MaNVC', sql.Int, id)
        .execute('sp_DeleteShipper');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Shipper;