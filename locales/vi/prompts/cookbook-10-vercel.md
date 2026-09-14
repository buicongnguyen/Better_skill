## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra
GITHUB_OWNER: [YOUR_ACCOUNT]
REPOSITORY: signal-garden
PUBLISH: YES
VERCEL_SCOPE: [YOUR_VERCEL_SCOPE]

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.
- PUBLISH: YES cho phép công khai repo/mã nguồn và triển khai như mô tả bên dưới; NO chỉ chuẩn bị phát hành cục bộ.
  Điền rõ mọi đích đến trước khi công khai.
  Tính URL và base path từ GITHUB_OWNER và REPOSITORY.

## Mục tiêu
Chuẩn bị hoặc công khai game trên Vercel Hobby theo PUBLISH.

## Công việc và ràng buộc
- Dùng GITHUB_OWNER và REPOSITORY ở đầu; điền rõ chỗ trống trước mọi hành động công khai bên ngoài.
- Kiểm tra repo, nhánh, remote, diff đúng phạm vi, bí mật đã loại và giấy phép asset. Giữ công việc không liên quan; không thay remote xung đột hay force-push.
- Giữ engine hiện có.
  Với Vite/Three.js, kiểm tra lệnh cài/build và đầu ra dist.
  Với Godot, kiểm tra phiên bản đã cài, khả năng xuất web và thư mục xuất thực tế; giữ tên tệp đã sinh.
  Chứng minh bản tĩnh chạy được trước khi công khai.
- Điền rõ VERCEL_SCOPE trước khi liên kết dự án. Kiểm tra liên kết Vercel hiện có, báo xung đột đích đến thay vì ghi đè.
- Xác minh game cá nhân, phi thương mại này đủ điều kiện Hobby theo giới hạn hiện hành; không mua dịch vụ hay nâng gói.
- Dùng Vite base / khi triển khai Vite tại gốc tên miền.
  Kiểm tra lệnh build và thư mục đầu ra thực tế của engine đã chọn; không giả định mọi engine dùng dist.
  Chuẩn bị cấu hình Vercel.
- Nếu PUBLISH là YES, tôi cho phép tạo repo GitHub công khai đã nêu nếu chưa có, commit và push các tệp game đúng phạm vi đã rà soát, rồi công khai trên host đã chọn.
  Nếu PUBLISH là NO, dừng sau chuẩn bị cục bộ và báo các bước phát hành còn lại.
- Với YES, dùng Vercel CLI đã đăng nhập hoặc nhập Git trong VERCEL_SCOPE. Hướng dẫn đăng nhập trình duyệt hay quyền repo khi cần; không hỏi bí mật trong chat.
- Xác minh revision đã triển khai và gameplay công khai không cần đăng nhập. Báo URL production thực tế được cấp và kiểm tra chưa chạy.

## Điều kiện hoàn thành
PUBLISH=NO: gói phát hành cục bộ đã thử và các bước còn lại.

PUBLISH=YES: commit đã rà, triển khai thành công đúng revision, URL công khai và ghi chép kiểm tra thực tế.

Nêu trở ngại cụ thể nếu chưa hoàn thành được.
