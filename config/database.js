const sql = require('mssql/msnodesqlv8');

// Cấu hình kết nối SQL Server cho Trung Tâm
const masterConfig = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};" +
    "Server=KENJU\\MSSQLSERVER123;" +
    "Database=TrungTam;" +
    "Uid=sa;" +
    "Pwd=123;",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function testConnection() {
  try {
    console.log('🔄 Đang thử kết nối...');

    // Kết nối tới SQL Server với connectionString
    const pool = await sql.connect(masterConfig);

    console.log('✅ Kết nối thành công đến database:', 'TrungTam');

    // Đóng kết nối sau khi kiểm tra xong
    await pool.close(); 

  } catch (error) {
    console.error('❌ Lỗi kết nối:', error.message);
  }
}

// Gọi hàm testConnection để bắt đầu kiểm tra kết nối
testConnection();

// Cấu hình kết nối cho các chi nhánh khu vực
const regionalConfigs = {
  north: {
    connectionString:
      "Driver={ODBC Driver 17 for SQL Server};" +
      "Server=KENJU\\MSSQLSERVER123;" +
      "Database=ChiNhanhBac;" +
      "Uid=sa;" +
      "Pwd=123;",
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  },
  south: {
    connectionString:
      "Driver={ODBC Driver 17 for SQL Server};" +
      "Server=KENJU\\MSSQLSERVER123;" +
      "Database=ChiNhanhNam;" +
      "Uid=sa;" +
      "Pwd=123;",
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
};

module.exports = { masterConfig, regionalConfigs };
