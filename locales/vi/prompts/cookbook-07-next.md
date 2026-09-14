## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.

## Mục tiêu
Hoàn thành một mốc chơi được kế tiếp từ trạng thái hiện tại.

## Công việc và ràng buộc
- Tiếp tục game từ trạng thái thực tế.
- Đọc docs/progress.md, tiêu chí nghiệm thu và mã liên quan; xác minh mốc trước thay vì chỉ tin ghi chú.
- Làm mốc chơi được còn thiếu tiếp theo: vòng thắng, rồi drone/máu/thua do hết giờ, rồi hoàn thiện hình ảnh, rồi sẵn sàng phát hành.
- Lần này hoàn thành một mốc và các kiểm tra bị ảnh hưởng.
- Giữ luật đã thống nhất: xét thua trước kích hoạt, thu pin một lần, thời gian miễn sát thương và chơi lại sạch.
- Dùng asset tạm đến khi cơ chế đạt.
- Ghi lệnh, kết quả quan sát, lỗi còn lại và bước tiếp theo.
- Rà diff và chỉ commit thay đổi của mốc sau khi kiểm tra đạt.
- Để xuất bản cho bước phát hành.

## Điều kiện hoàn thành
Thêm một mốc chơi được, kiểm tra tương ứng và commit đã rà.
