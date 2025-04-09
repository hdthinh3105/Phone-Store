const sql = require('mssql');
const { masterConfig } = require('../../config/database');

// Model City - CRUD operations
class City {
  static async createCity(cityData) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaTP', sql.NChar(20), cityData.MaTP)
        .input('MoTa', sql.NChar(30), cityData.MoTa)
        .input('MaVung', sql.Int, cityData.MaVung)
        .execute('sp_CreateCity');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getAllCities() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().execute('sp_GetAllCities');
      return result.recordset;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getCityById(cityId) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaTP', sql.NChar(20), cityId)
        .execute('sp_GetCityById');
      return result.recordset[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateCity(cityId, cityData) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaTP', sql.NChar(20), cityId)
        .input('MoTa', sql.NChar(30), cityData.MoTa)
        .input('MaVung', sql.Int, cityData.MaVung)
        .execute('sp_UpdateCity');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async deleteCity(cityId) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaTP', sql.NChar(20), cityId)
        .execute('sp_DeleteCity');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async searchCities(query) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('query', sql.NVarChar(100), query)
        .execute('sp_SearchCities');
      return result.recordset;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = City;
