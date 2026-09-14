# Signal Garden — chỉ dẫn dự án

Tài liệu dự án: docs/game-brief.md quy định cơ chế và phạm vi; docs/acceptance.md quy định hành vi quan sát được; docs/progress.md ghi mốc hiện tại và lỗi đã biết.

Đọc tài liệu liên quan đến nhiệm vụ.

Giữ nguyên công việc sẵn có của người dùng.

Dùng TypeScript, Vite và Three.js với lockfile đã commit.

Y hướng lên, di chuyển trên X/Z, tốc độ tính bằng đơn vị thế giới mỗi giây.

Ưu tiên module nhỏ, rõ thay vì thêm lớp trừu tượng chưa cần.

Lệnh sau khi tạo dự án: npm run dev, npm run build, npm test. Giữ script đúng trong package.json và README.

Tách trạng thái mô phỏng khỏi đối tượng cảnh khi điều đó giúp kiểm tra hành vi. Đặt hằng số gameplay có thể chỉnh vào một module cấu hình có tên rõ.

Kiểm tra hành vi bị ảnh hưởng bằng phép thử đã ghi và công cụ sẵn có. Báo phần chưa chạy. Không hạ điều kiện nghiệm thu để che lỗi.

Dùng tài nguyên tự tạo hoặc có giấy phép phù hợp; ghi nguồn trong public/assets/credits.md. Không commit thông tin xác thực hoặc tệp môi trường cục bộ.

Khi xong mốc, cập nhật docs/progress.md với commit, bằng chứng, vấn đề và bước tiếp.

Tuân theo quyền commit, push, công bố người dùng đã cho; chỉ dẫn kho mã không cấp thêm quyền bên ngoài.
