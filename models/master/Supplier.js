const sql = require('mssql');
const { masterConfig } = require('../../config/database');

class Supplier {
  static async getAll() {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request().query('SELECT * FROM TrungTam.dbo.NhaCungCap');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await sql.connect(masterConfig);
      const result = await pool.request()
        .input('MaNCC', sql.Int, id)
        .query('SELECT * FROM TrungTam.dbo.NhaCungCap WHERE MaNCC = @MaNCC');
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(supplier) {
    try {
      const pool = await sql.connect(masterConfig);
      const { MaNCC, TenCongTy, DiaChi, ThanhPho, Mien, MaBuuChinh, QuocGia, SoDienThoai, Fax } = supplier;
      await pool.request()
        .input('MaNCC', sql.Int, MaNCC)
        .input('TenCongTy', sql.NVarChar(250), TenCongTy)
        .input('DiaChi', sql.NVarChar(250), DiaChi)
        .input('ThanhPho', sql.NVarChar(100), ThanhPho)
        .input('Mien', sql.NVarChar(100), Mien)
        .input('MaBuuChinh', sql.NVarChar(10), MaBuuChinh)
        .input('QuocGia', sql.NVarChar(15), QuocGia)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .input('Fax', sql.NVarChar(24), Fax)
        .query('INSERT INTO TrungTam.dbo.NhaCungCap (MaNCC, TenCongTy, DiaChi, ThanhPho, Mien, MaBuuChinh, QuocGia, SoDienThoai, Fax) VALUES (@MaNCC, @TenCongTy, @DiaChi, @ThanhPho, @Mien, @MaBuuChinh, @QuocGia, @SoDienThoai, @Fax)');
    } catch (err) {
      throw err;
    }
  }

  static async update(id, supplier) {
    try {
      const pool = await sql.connect(masterConfig);
      const { TenCongTy, DiaChi, ThanhPho, Mien, MaBuuChinh, QuocGia, SoDienThoai, Fax } = supplier;
      await pool.request()
        .input('MaNCC', sql.Int, id)
        .input('TenCongTy', sql.NVarChar(250), TenCongTy)
        .input('DiaChi', sql.NVarChar(250), DiaChi)
        .input('ThanhPho', sql.NVarChar(100), ThanhPho)
        .input('Mien', sql.NVarChar(100), Mien)
        .input('MaBuuChinh', sql.NVarChar(10), MaBuuChinh)
        .input('QuocGia', sql.NVarChar(15), QuocGia)
        .input('SoDienThoai', sql.NVarChar(24), SoDienThoai)
        .input('Fax', sql.NVarChar(24), Fax)
        .query('UPDATE TrungTam.dbo.NhaCungCap SET TenCongTy = @TenCongTy, DiaChi = @DiaChi, ThanhPho = @ThanhPho, Mien = @Mien, MaBuuChinh = @MaBuuChinh, QuocGia = @QuocGia, SoDienThoai = @SoDienThoai, Fax = @Fax WHERE MaNCC = @MaNCC');
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await sql.connect(masterConfig);
      await pool.request()
        .input('MaNCC', sql.Int, id)
        .query('DELETE FROM TrungTam.dbo.NhaCungCap WHERE MaNCC = @MaNCC');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Supplier;