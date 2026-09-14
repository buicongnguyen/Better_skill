## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra
ENGINE: AUTO
PROJECT_NAME: Signal Garden
ASSET_TOOL: PRIMITIVES
RULE_CHANGES: không

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.
- ENGINE: AUTO giữ engine hiện có; nếu chưa có thì so sánh THREE (TypeScript/Vite/Three.js) và GODOT (Godot/GDScript xuất web).
  Chọn một; đổi giá trị không cho phép tự chuyển engine của dự án hiện có.
  KEEP dùng lựa chọn đã ghi trong dự án.
- ASSET_TOOL: PRIMITIVES dùng hình học trong engine; BLENDER dùng quy trình Blender có sẵn sau thử nghiệm nhập nhỏ.
  Cả hai đều bắt đầu bằng khối tạm; không cài công cụ chỉ vì thấy tên ở đây.
- PROJECT_NAME đặt tên cho ví dụ này.
  RULE_CHANGES ghi thay đổi của bạn so với mặc định bên dưới.
  Đối chiếu với tài liệu đã thống nhất trước khi sửa; lưu một bộ luật chuẩn duy nhất.

## Mục tiêu
Soạn hoặc đồng bộ mô tả game và kiểm tra nghiệm thu quan sát được.

## Công việc và ràng buộc
- Trong dự án game này, đọc chỉ dẫn và tài liệu hiện có trước.
- Soạn hoặc đồng bộ docs/game-brief.md và docs/acceptance.md cho PROJECT_NAME: một sân thượng 24 x 24 mét, camera cố định trên cao, di chuyển bằng bàn phím, ba pin năng lượng và một đèn hiệu.
- Vòng chơi dài 90 giây, ba điểm máu, một drone tuần tra, thời gian miễn sát thương sau mỗi lần trúng là một giây.
- Nhấn E kích hoạt đèn khi đã lấy đủ pin và cách tâm đèn không quá hai đơn vị trên mặt phẳng đất.
- Thua được ưu tiên nếu thời gian hoặc máu về 0 trong cùng bước.
- Tạm dừng đóng băng mô phỏng; mất focus thì tạm dừng và xóa phím đang giữ; tiếp tục phải chủ động; chơi lại đặt lại toàn bộ trạng thái.
- Loại multiplayer, backend, tài khoản và tài nguyên trả phí.
- Tách yêu cầu khỏi giả định thiết kế.
- Giải quyết mâu thuẫn với lựa chọn đã có của người dùng trước khi sửa.
- Trả bản mô tả và kiểm tra quan sát được, chưa viết gameplay.

## Điều kiện hoàn thành
Bản mô tả và danh sách nghiệm thu ngắn, luật nhất quán.
