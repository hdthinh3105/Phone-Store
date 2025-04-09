const sql = require('mssql');

// Cấu hình kết nối SQL Server cho Trung Tâm
const masterConfig = {
  user: process.env.DB_MASTER_USER || 'sa',
  password: process.env.DB_MASTER_PASSWORD || '12345',
  server: process.env.DB_MASTER_SERVER || 'host.docker.internal',
  database: 'TrungTam',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    instanceName: process.env.DB_MASTER_INSTANCE_NAME || 'MSSQLSERVER2'
  }
};

// Cấu hình kết nối cho các chi nhánh khu vực
const regionalConfigs = {
  north: {
    user: process.env.DB_NORTH_USER || 'sa',
    password: process.env.DB_NORTH_PASSWORD || '12345',
    server: process.env.DB_NORTH_SERVER || 'host.docker.internal',
    database: 'ChiNhanhBac',
    options: {
      encrypt: true,
      trustServerCertificate: true,
      instanceName: process.env.DB_NORTH_INSTANCE_NAME || 'MSSQLSERVER2'
    }
  },
  south: {
    user: process.env.DB_SOUTH_USER || 'sa',
    password: process.env.DB_SOUTH_PASSWORD || '12345',
    server: process.env.DB_SOUTH_SERVER || 'host.docker.internal',
    database: 'ChiNhanhNam',
    options: {
      encrypt: true,
      trustServerCertificate: true,
      instanceName: process.env.DB_SOUTH_INSTANCE_NAME || 'MSSQLSERVER2'
    }
  }
};

module.exports = { masterConfig, regionalConfigs };