const sql = require("mssql/msnodesqlv8");

// Cấu hình kết nối SQL Server
const masterConfig = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};" +
    "Server=Kenju\\CENTER;" + // Dùng đúng tên instance
    "Database=TrungTam;" +
    "Uid=sa;" +
    "Pwd=12345;",
  options: {
    encrypt: false, // Tắt nếu không dùng SSL
    trustServerCertificate: true,
  },
};

const regionalConfigs = {
  north: {
    connectionString:
      "Driver={ODBC Driver 17 for SQL Server};" +
      "Server=Kenju\\CENTER;" + // Dùng đúng tên instance
      "Database=ChiNhanhBac;" +
      "Uid=sa;" +
      "Pwd=12345;",
    options: {
      encrypt: false, // Tắt nếu không dùng SSL
      trustServerCertificate: true,
    },
  },
  south: {
    connectionString:
      "Driver={ODBC Driver 17 for SQL Server};" +
      "Server=Kenju\\CENTER;" + // Dùng đúng tên instance
      "Database=ChiNhanhNam;" +
      "Uid=sa;" +
      "Pwd=12345;",
    options: {
      encrypt: false, // Tắt nếu không dùng SSL
      trustServerCertificate: true,
    },
  },
};
async function testConnectionRegion(region, config) {
  try {
    console.log(`🔄 Đang thử kết nối đến: ${region}`);
    const pool = await sql.connect(config);
    console.log(`✅ Kết nối thành công đến database: ${region}`);
    await pool.close();
  } catch (error) {
    console.error(`❌ Lỗi kết nối ${region}:`, error.message);
  }
}

// Kiểm tra cả hai chi nhánh
async function testAllConnections() {
  await testConnectionRegion("ChiNhanhBac", regionalConfigs.north);
  await testConnectionRegion("ChiNhanhNam", regionalConfigs.south);
}

// Kiểm tra kết nối
async function testConnection() {
  try {
    console.log("🔄 Đang thử kết nối đến:", "TrungTam");

    const pool = await sql.connect(masterConfig);

    console.log(
      "✅ Kết nối thành công đến database: Trung Tam ",

    );

    await pool.close();
  } catch (error) {
    console.error("❌ Lỗi kết nối:", error.message);
  }
}

// Thử kết nối
testConnection();
 testAllConnections();
// Xuất module
module.exports = {masterConfig};
