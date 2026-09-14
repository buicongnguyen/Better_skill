## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra
GITHUB_OWNER: [YOUR_ACCOUNT]
REPOSITORY: signal-garden
PUBLISH: YES

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code.
  Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code.
  Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER.
  Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.
- PUBLISH: YES cho phép công khai repo/mã nguồn và triển khai như mô tả bên dưới; NO chỉ chuẩn bị phát hành cục bộ.
  Điền rõ mọi đích đến trước khi công khai.
  Tính URL và base path từ GITHUB_OWNER và REPOSITORY.

## Mục tiêu
Chuẩn bị hoặc công khai game trên GitHub Pages theo PUBLISH.

## Công việc và ràng buộc
- Dùng GITHUB_OWNER và REPOSITORY ở đầu; điền rõ chỗ trống trước mọi hành động công khai bên ngoài.
- Kiểm tra repo, nhánh, remote, diff đúng phạm vi, bí mật đã loại và giấy phép asset.
  Giữ công việc không liên quan; không thay remote xung đột hay force-push.
- Giữ engine hiện có.
  Với Vite/Three.js, kiểm tra lệnh cài/build và đầu ra dist.
  Với Godot, kiểm tra phiên bản đã cài, khả năng xuất web và thư mục xuất thực tế; giữ tên tệp đã sinh.
  Chứng minh bản tĩnh chạy được trước khi công khai.
- Với site dự án, tính URL https://GITHUB_OWNER.github.io/REPOSITORY/ bằng giá trị thực.
  Đặt Vite base /REPOSITORY/ nếu dùng Vite; với engine khác, kiểm tra asset đã xuất dưới đường dẫn đó.
- Chuẩn bị workflow GitHub Pages Actions build dự án và chỉ tải lên thư mục tĩnh đã kiểm tra, với quyền Pages cần thiết.
- Nếu PUBLISH là YES, tôi cho phép tạo repo GitHub công khai đã nêu nếu chưa có, commit và push các tệp game đúng phạm vi đã rà soát, rồi công khai trên host đã chọn.
  Nếu PUBLISH là NO, dừng sau chuẩn bị cục bộ và báo các bước phát hành còn lại.
- Với YES, bật Pages từ GitHub Actions nếu có quyền và theo dõi workflow của đúng commit đã push.
- Mở URL công khai, kiểm tra asset và một vòng đầy đủ bằng điều khiển thật nếu có công cụ; nêu kiểm tra chưa thực hiện.

## Điều kiện hoàn thành
PUBLISH=NO: gói phát hành cục bộ đã thử và các bước còn lại.

PUBLISH=YES: commit đã rà, triển khai thành công đúng revision, URL công khai và ghi chép kiểm tra thực tế.

Nêu trở ngại cụ thể nếu chưa hoàn thành được.
