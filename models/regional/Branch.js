const sql = require('mssql');
const { regionalConfigs } = require('../../config/database');

class Branch {
  static async getAll() {
    try {
      const pool = await sql.connect(regionalConfigs.north); // Hoặc south tùy theo chi nhánh
      const result = await pool.request().query('SELECT * FROM ChiNhanh');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const result = await pool.request()
        .input('MaCN', sql.Int, id)
        .query('SELECT * FROM ChiNhanh WHERE MaCN = @MaCN');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(branch) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const { MaCN, TenChiNhanh, DiaChi, ThanhPho, Mien, SoDienThoai } = branch;
      await pool.request()
        .input('MaCN', sql.Int, MaCN)
        .input('TenChiNhanh', sql.NVarChar(250), TenChiNhanh)
        .input('DiaChi', sql.NVarChar(250), DiaChi)
        .input('ThanhPho', sql.NVarChar(100), ThanhPho)
        .input('Mien', sql.NVarChar(100), Mien)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .query('INSERT INTO ChiNhanh (MaCN, TenChiNhanh, DiaChi, ThanhPho, Mien, SoDienThoai) VALUES (@MaCN, @TenChiNhanh, @DiaChi, @ThanhPho, @Mien, @SoDienThoai)');
    } catch (err) {
      throw err;
    }
  }

  static async update(id, branch) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      const { TenChiNhanh, DiaChi, ThanhPho, Mien, SoDienThoai } = branch;
      await pool.request()
        .input('MaCN', sql.Int, id)
        .input('TenChiNhanh', sql.NVarChar(250), TenChiNhanh)
        .input('DiaChi', sql.NVarChar(250), DiaChi)
        .input('ThanhPho', sql.NVarChar(100), ThanhPho)
        .input('Mien', sql.NVarChar(100), Mien)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .query('UPDATE ChiNhanh SET TenChiNhanh = @TenChiNhanh, DiaChi = @DiaChi, ThanhPho = @ThanhPho, Mien = @Mien, SoDienThoai = @SoDienThoai WHERE MaCN = @MaCN');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(regionalConfigs.north);
      await pool.request()
        .input('MaCN', sql.Int, id)
        .query('DELETE FROM ChiNhanh WHERE MaCN = @MaCN');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Branch;