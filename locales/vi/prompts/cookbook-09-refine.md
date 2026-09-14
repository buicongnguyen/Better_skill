## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code.
  Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code.
  Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER.
  Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.

## Mục tiêu
Sửa một lỗi có bằng chứng và chuẩn bị bản prompt được đánh giá trung thực.

## Công việc và ràng buộc
- Đọc bằng chứng chơi thử mới nhất và tái hiện lỗi ảnh hưởng lớn nhất.
- Lần từ đầu vào qua thay đổi trạng thái đến hiển thị, dẫn tệp thật và lịch sử Git liên quan.
- Sửa nguyên nhân bằng thay đổi nhỏ phù hợp, chạy lại kiểm tra bị ảnh hưởng và giữ mốc hoạt động đã rà soát.
- Lưu prompt liên quan, model/cài đặt, commit gốc, kết quả và liên kết bằng chứng vào docs/prompt-log.md; không chép thông tin đăng nhập hay hội thoại thừa.
- Chắt lọc bài học đã xác minh vào mô tả, kiểm tra hoặc prompt ứng viên P2 gọn.
- Phân biệt prompt P1 với phiên bản game.
- Giải thích game V2 được sửa tốt hơn chưa chứng minh prompt tốt hơn.
- Đề xuất so P1/P2 từ cùng mốc sạch, quyền công cụ và ngân sách ngang nhau, thử nhiều lần và có bài giữ lại; chỉ chạy trong phạm vi đánh giá đã thống nhất.

## Điều kiện hoàn thành
Bản sửa đã thử và prompt ứng viên gọn, kèm kế hoạch so công bằng.
