## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra
ENGINE: AUTO
OS: AUTO (Windows / macOS / Linux)
SHELL: AUTO (PowerShell / bash / zsh)

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.
- ENGINE: AUTO giữ engine hiện có; nếu chưa có thì báo lựa chọn THREE (TypeScript/Vite/Three.js) và GODOT (Godot/GDScript xuất web).
  Chọn một; đổi giá trị không cho phép tự chuyển engine của dự án hiện có.

## Mục tiêu
Kiểm tra thư mục dự án đang chọn mà không sửa đổi.

## Công việc và ràng buộc
- Với ENGINE=THREE, kiểm tra Node.js/npm; với GODOT, kiểm tra trình biên tập và mẫu xuất web.
  AUTO báo engine hiện có hoặc lựa chọn sẵn có, không cài.
  Dùng OS/SHELL thực tế khi giá trị là AUTO; mọi bước thiết lập phải theo engine đã chọn.
- Báo đường dẫn tuyệt đối, tệp hiện có, thư mục gốc/nhánh/trạng thái Git, URL remote đã ẩn thông tin nhạy cảm và khả năng dùng Git, GitHub CLI, Node.js, npm.
- Đối chiếu runtime với yêu cầu dự án.
- Báo trạng thái xác thực GitHub nhưng không hiện token, khóa riêng hay giá trị biến môi trường.
- Phân biệt thiếu công cụ, chưa đăng nhập và lỗi quyền.
- Nếu thư mục trống, nói rõ; không bịa script package.
- Đưa các bước ngắn nhất theo hệ điều hành để sẵn sàng làm game cục bộ bằng engine đã chọn.
- Lần kiểm tra này không cài đặt, khởi tạo Git, commit, push hay triển khai.

## Điều kiện hoàn thành
Báo cáo môi trường đúng và các bước thiết lập còn lại ngắn nhất; không đổi tệp hay cài đặt tài khoản.
