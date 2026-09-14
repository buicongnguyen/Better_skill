## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra
ASSET_TOOL: PRIMITIVES

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.
- ASSET_TOOL: PRIMITIVES dùng hình học trong engine; BLENDER dùng quy trình Blender có sẵn sau thử nghiệm nhập nhỏ.
  Cả hai đều bắt đầu bằng khối tạm; không cài công cụ chỉ vì thấy tên ở đây.

## Mục tiêu
Triển khai và kiểm tra mốc di chuyển chơi được đầu tiên.

## Công việc và ràng buộc
- Dùng docs/game-brief.md, docs/acceptance.md và docs/decisions.md đã thống nhất để làm lát cắt di chuyển chơi được đầu tiên của game trong thư mục đang chọn.
- Đọc mã hiện tại trước khi sửa và giữ stack đã chọn.
- Tạo nền, robot tạm, camera cố định trên cao, di chuyển bàn phím và biên va chạm.
- Dùng đơn vị nhất quán, chuẩn hóa đầu vào chéo kỹ thuật số khác 0.
- Xử lý tạm dừng, mất focus, tiếp tục chủ động mà không kẹt phím hay nhảy bước thời gian lớn.
- Thiết lập lệnh cài thư viện, dev và build chạy được.
- Kiểm tra build và thao tác bàn phím thật nếu có công cụ; báo kiểm tra chưa chạy được.
- Cập nhật docs/progress.md với phần hoạt động và mốc tiếp.
- Dừng tại mốc di chuyển để tôi xem; không thêm chức năng ngoài phạm vi hay xuất bản.

## Điều kiện hoàn thành
Lát cắt di chuyển chạy được và ghi chép kiểm tra trung thực. Bản khởi tạo dài hơn ở liên kết dưới.
