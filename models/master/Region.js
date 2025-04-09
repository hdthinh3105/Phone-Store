const sql = require('mssql');
const { masterConfig } = require('../../config/database');

// Model Region - CRUD operations
class Region {
  static async createRegion(regionData) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaVung', sql.Int, regionData.MaVung)
        .input('MoTa', sql.NChar(30), regionData.MoTa)
        .execute('sp_CreateRegion');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getAllRegions() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().execute('sp_GetAllRegions');
      return result.recordset;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getRegionById(regionId) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaVung', sql.Int, regionId)
        .execute('sp_GetRegionById');
      return result.recordset[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateRegion(regionId, regionData) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaVung', sql.Int, regionId)
        .input('MoTa', sql.NChar(30), regionData.MoTa)
        .execute('sp_UpdateRegion');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async deleteRegion(regionId) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaVung', sql.Int, regionId)
        .execute('sp_DeleteRegion');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async searchRegions(query) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('query', sql.NVarChar(100), query)
        .execute('sp_SearchRegions');
      return result.recordset;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Region;