// Import module cần thiết để kết nối SQL Server
const sql = require('mssql/msnodesqlv8');

const config = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};" +
    "Server=KENJU\\MSSQLSERVER123;" +
    "Database=center;" +
    "Uid=sa;" +
    "Pwd=123;",
  database: 'center'
};



// Hàm bất đồng bộ để test kết nối
async function testConnection() {
  try {
    console.log('🔄 Đang thử kết nối...');
    
    // Kết nối tới SQL Server với cấu hình đã cung cấp
    const pool = await sql.connect(config);
    
    console.log('✅ Kết nối thành công đến database:', config.database);
    
    // Nếu cần, có thể thực hiện các thao tác khác với biến pool ở đây.
    
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error.message);
  }
}

// Gọi hàm testConnection để bắt đầu kiểm tra kết nối
testConnection();
