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
Tạo bộ nhớ dự án đúng và mốc Git cục bộ đã rà soát.

## Công việc và ràng buộc
- Chuẩn bị bộ nhớ dự án game.
- Kiểm tra gốc Git và công việc hiện tại trước; tránh vô tình tạo repo lồng nhau.
- Với thư mục mới độc lập, khởi tạo Git trên main.
- Giữ lịch sử và tệp không liên quan.
- Đồng bộ mô tả, tiêu chí nghiệm thu, quyết định và docs/progress.md; AGENTS.md chỉ chứa quy ước dự án ngắn, hữu ích.
- Tạo .gitignore phù hợp trước khi stage: bỏ bí mật, thông tin đăng nhập cục bộ, thư viện và đầu ra sinh tự động; giữ mã nguồn và lockfile.
- Đọc lại diff, chỉ stage tệp đúng phạm vi và tạo commit mốc cục bộ khi danh tính tác giả đã cấu hình đúng.
- Nếu thiếu danh tính, hỏi thay vì bịa.
- Báo commit và mốc tiếp theo.
- Bước này chưa tạo remote hay xuất bản.

## Điều kiện hoàn thành
Tài liệu đã rà và commit mốc cục bộ; chưa xuất bản.
