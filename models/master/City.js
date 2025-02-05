const sql = require('mssql');
const { masterConfig } = require('../../config/database');

// Model City - CRUD operations
class City {
  static async createCity(cityData) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('TenTP', sql.NVarChar, cityData.TenTP)
        .query('INSERT INTO ThanhPho (TenTP) VALUES (@TenTP)');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getAllCities() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().query('SELECT * FROM ThanhPho');
      return result.recordset;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getCityById(cityId) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaTP', sql.Int, cityId)
        .query('SELECT * FROM ThanhPho WHERE MaTP = @MaTP');
      return result.recordset[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateCity(cityId, cityData) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaTP', sql.Int, cityId)
        .input('TenTP', sql.NVarChar, cityData.TenTP)
        .query('UPDATE ThanhPho SET TenTP = @TenTP WHERE MaTP = @MaTP');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async deleteCity(cityId) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaTP', sql.Int, cityId)
        .query('DELETE FROM ThanhPho WHERE MaTP = @MaTP');
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async searchCities(query) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('query', sql.NVarChar, `%${query}%`)
        .query('SELECT * FROM ThanhPho WHERE TenTP LIKE @query');
      return result.recordset;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = City;
