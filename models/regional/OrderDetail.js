const sql = require('mssql');
const { regionalConfigs } = require('../../config/database');

class OrderDetail {
  static async getAll(region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      await sql.close();
      pool = await sql.connect(regionalConfigs[region]);
      const result = await pool.request().execute('sp_GetAllOrderDetails');
      return result.recordset;
    } catch (err) {
      console.error('Error in getAll:', err);
      throw err;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }

  static async getById(orderId, productId, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      await sql.close();
      pool = await sql.connect(regionalConfigs[region]);
      const result = await pool.request()
        .input('MaDH', sql.Int, orderId)
        .input('MaSP', sql.Int, productId)
        .execute('sp_GetOrderDetailById');
      return result.recordset[0];
    } catch (err) {
      console.error('Error in getById:', err);
      throw err;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }

  static async create(orderDetail, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      await sql.close();
      pool = await sql.connect(regionalConfigs[region]);
      const { MaDH, MaSP, ThanhTien, SoLuong, GiamGia } = orderDetail;
      await pool.request()
        .input('MaDH', sql.Int, MaDH)
        .input('MaSP', sql.Int, MaSP)
        .input('ThanhTien', sql.Money, ThanhTien)
        .input('SoLuong', sql.SmallInt, SoLuong)
        .input('GiamGia', sql.Real, GiamGia)
        .execute('sp_CreateOrderDetail');
    } catch (err) {
      console.error('Error in create:', err);
      throw err;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }

  static async update(orderId, productId, orderDetail, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      await sql.close();
      pool = await sql.connect(regionalConfigs[region]);
      const { ThanhTien, SoLuong, GiamGia } = orderDetail;
      await pool.request()
        .input('MaDH', sql.Int, orderId)
        .input('MaSP', sql.Int, productId)
        .input('ThanhTien', sql.Money, ThanhTien)
        .input('SoLuong', sql.SmallInt, SoLuong)
        .input('GiamGia', sql.Real, GiamGia)
        .execute('sp_UpdateOrderDetail');
    } catch (err) {
      console.error('Error in update:', err);
      throw err;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }

  static async delete(orderId, productId, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      await sql.close();
      pool = await sql.connect(regionalConfigs[region]);
      await pool.request()
        .input('MaDH', sql.Int, orderId)
        .input('MaSP', sql.Int, productId)
        .execute('sp_DeleteOrderDetail');
    } catch (err) {
      console.error('Error in delete:', err);
      throw err;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }

  static async getByOrderId(orderId, region = 'north') {
    let pool;
    try {
      console.log('Model - Region:', region);
      await sql.close();
      pool = await sql.connect(regionalConfigs[region]);
      const result = await pool.request()
        .input('MaDH', sql.Int, orderId)
        .execute('sp_GetOrderDetailsByOrderId');
      return result.recordset;
    } catch (err) {
      console.error('Error in getByOrderId:', err);
      throw err;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }
}

module.exports = OrderDetail;