## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra
VIDEO_TOOL: AUTO
DURATION_SECONDS: 20
PAID_BUDGET: 0

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.
- VIDEO_TOOL: AUTO chọn trình dựng phù hợp đã cài; REMOTION yêu cầu quy trình Remotion có sẵn.
  Nếu thiếu, báo phần thiếu và chuẩn bị danh sách cảnh.
  Dùng DURATION_SECONDS làm tổng thời lượng; PAID_BUDGET là mức chi sinh nội dung tối đa được cho phép riêng.

## Mục tiêu
Chuẩn bị video giới thiệu dài DURATION_SECONDS giây cho bản game hiện tại.

## Công việc và ràng buộc
- Trước hết kiểm tra game thật và công cụ quay/dựng có sẵn.
- Dùng trình tự đơn giản: tên và mục tiêu, cảnh di chuyển/thu pin thật, thử thách drone, kích hoạt đèn, URL chơi.
- Lưu danh sách cảnh, phụ đề, manifest asset gồm đường dẫn, quyền dùng và revision game.
- Nếu thiếu footage, đưa kế hoạch quay cụ thể và đánh dấu cảnh chờ; không bịa gameplay.
- Ưu tiên công cụ có sẵn để dựng xác định, như quy trình Remotion đã cài.
- Chỉ dùng nội dung sinh làm hình ý tưởng có nhãn rõ.
- Ngân sách sinh là 0 nếu chưa được cho phép riêng.
- Chỉ render nháp khi có đủ media và công cụ; rà chữ, nhịp, âm thanh, URL cuối.
- Báo tệp đầu ra và phần chờ.
- Xuất bản trailer là hành động riêng.

## Điều kiện hoàn thành
Kế hoạch cảnh DURATION_SECONDS giây, danh sách media đã kiểm tra và bản video nháp đã rà khi khả thi.
