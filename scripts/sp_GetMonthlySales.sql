-- Stored Procedure để lấy doanh số hàng tháng cho Dashboard (Regional)
CREATE PROCEDURE sp_GetMonthlySales
    @Year INT
AS
BEGIN
    -- Tạo bảng tạm chứa 12 tháng
    DECLARE @Months TABLE (MonthNum INT PRIMARY KEY);
    INSERT INTO @Months (MonthNum) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12);

    -- Lấy dữ liệu doanh số theo tháng
    SELECT
        m.MonthNum AS Thang,
        ISNULL(SUM(ctdh.ThanhTien * (1 - ctdh.GiamGia)), 0) AS TongDoanhSo
    FROM
        @Months m
    LEFT JOIN
        dbo.DonHang dh ON m.MonthNum = MONTH(dh.NgayDatHang) AND YEAR(dh.NgayDatHang) = @Year
    LEFT JOIN
        dbo.ChiTietDonHang ctdh ON dh.MaDH = ctdh.MaDH
    GROUP BY
        m.MonthNum
    ORDER BY
        m.MonthNum;
END
GO 