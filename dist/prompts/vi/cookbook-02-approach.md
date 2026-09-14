## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra
ENGINE: AUTO

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.
- ENGINE: AUTO giữ engine hiện có; nếu chưa có thì so sánh THREE (TypeScript/Vite/Three.js) và GODOT (Godot/GDScript xuất web).
  Chọn một; đổi giá trị không cho phép tự chuyển engine của dự án hiện có.
  KEEP dùng lựa chọn đã ghi trong dự án.
- Nếu ENGINE đã được chọn rõ, đánh giá lộ trình đó theo bản mô tả thay vì đề nghị engine khác.

## Mục tiêu
Chọn một engine khả thi và ghi bằng chứng cho lựa chọn đó.

## Công việc và ràng buộc
- Đọc mô tả game và kiểm tra công cụ có sẵn.
- So TypeScript/Vite/Three.js với Godot xuất web cho game bàn phím nhỏ này: tốc độ lặp, quy trình asset, giới hạn trình duyệt, gỡ lỗi và triển khai.
- Giữ engine đã được chọn rõ ràng.
- Nếu chưa chọn, đề xuất lộ trình đơn giản nhất khả thi; mặc định ví dụ là TypeScript/Vite/Three.js.
- Kiểm tra nhận định phụ thuộc phiên bản qua tài liệu chính thức và nêu điều chưa biết.
- Ghi quyết định vào docs/decisions.md.
- Nếu chưa rõ khả năng xuất trình duyệt có thể làm lựa chọn thất bại, chỉ tạo cảnh thử tối thiểu trong thư mục spike được đặt tên rõ và kiểm tra bản xuất production.
- Ghi lệnh và lỗi quan sát được; không nói kiểm tra chưa chạy là đã đạt.

## Điều kiện hoàn thành
Lựa chọn engine được ghi lại và bằng chứng xuất bản thử nếu cần thí nghiệm.
