## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.

## Mục tiêu
Kiểm tra game production bằng luật, điều khiển thật và quan sát người chơi.

## Công việc và ràng buộc
- Kiểm tra game hiện tại theo docs/acceptance.md trên bản production.
- Kiểm tra di chuyển, biên, tốc độ chéo, thu pin một lần, khoảng cách đèn, thời gian miễn sát thương, tạm dừng, mất focus/tiếp tục, hai nguyên nhân thua, thắng và chơi lại nhiều lần.
- Tách kiểm tra logic khỏi nhập liệu trình duyệt thật và quan sát hình ảnh.
- Ghi trình duyệt, viewport, revision, bước thử, kết quả mong đợi và thực tế vào mục mới trong docs/playtests/.
- Không suy ra chơi được từ build đạt.
- Cho tôi bài thử ngắn dành cho người mới: tìm mục tiêu, chơi một vòng, chơi lại, mô tả chỗ khó hiểu.
- Để quan sát của người ở trạng thái chờ đến khi tôi cung cấp.
- Xếp hạng lỗi cụ thể và đề xuất sửa nhỏ nhất tiếp theo.

## Điều kiện hoàn thành
Lỗi tái hiện được và danh sách rõ các kiểm tra còn chờ.
