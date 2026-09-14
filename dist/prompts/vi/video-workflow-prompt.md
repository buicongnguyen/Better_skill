# Làm trailer game nhỏ, dễ rà soát với GPT-6 Astra

Tạo teaser Signal Garden dài 10 giây, 16:9 trong dự án video riêng.
Ba cảnh 3, 3, 4 giây; tiêu đề rõ, gameplay dễ hiểu.

Điền đầu vào:
- Kho game và bản chạy được: [đường dẫn, lệnh]
- Bản quay và tham khảo được duyệt: [đường dẫn]
- Thư mục dự án video: [đường dẫn]
- Công cụ/dịch vụ và ngân sách tạo sinh được phép: [chi tiết]
- Đích công bố và quyền nếu có: [chi tiết]

Xem tệp thật, công cụ đã cài và skill sẵn có.

Tra tài liệu chính thức hiện hành khi API, mô hình hoặc lệnh có thể thay đổi.

Đề xuất cách nhỏ nhất phù hợp: quay game với Remotion, mẫu ComfyUI tương thích hoặc API video.

Chỉ thêm n8n khi phối hợp job lặp lại có ích.

Giải thích ngắn theo kết quả mục tiêu.

Chuẩn bị manifest có ID ổn định, ý định, độ dài, loại nguồn, đầu vào, đường dẫn đầu ra và trạng thái duyệt.

Cơ chế thật dùng gameplay quay; concept tạo sinh ghi rõ.

Ghép chữ chính xác khi dựng.

Recipe nhiều cảnh hoàn toàn tạo sinh là biến thể concept, không thay cảnh tuyên bố cơ chế đã triển khai.

Xác minh mẫu cloud riêng với hướng dẫn mô hình cục bộ.

Dùng skill phù hợp đã có.

Không tạo skill hoặc hook nếu chưa có quy trình lặp còn thiếu hoặc hành động sự kiện hữu ích.

Kết nối MCP phải thực sự cung cấp công cụ cần; xem năng lực đăng ký.

Làm composition cục bộ có thể xem bằng media có sẵn.

Thiếu đầu vào thì dùng placeholder ghi rõ và liệt kê thứ cần thay.

Không có ngân sách trả phí thì chuẩn bị yêu cầu nhưng chưa gửi.

Khi tạo sinh đã được phép: xác nhận schema thật, gửi một lần, lưu task ID, shot ID, mô hình/phiên bản, đầu vào và lần thử.

Chờ/poll trong giới hạn theo hướng dẫn.

Timeout thì giữ ID và kiểm tra job cũ trước retry.

Xử lý mọi trạng thái chưa kết thúc (kể cả THROTTLED của Runway), lỗi truy vấn thử lại được với backoff giới hạn và kết quả lạ/nghiêm trọng.

Timeout cục bộ không hủy job từ xa.

Gửi không rõ kết quả, không có ID thì đối soát trước gửi lại.

Lưu đầu ra bền vững trong dự án; nhận hướng dẫn tải chưa chứng minh tệp đã lưu.

Kiểm tra tệp, ghi chi phí thật nếu có; không đưa khóa vào GitHub.

Xem từng clip rồi toàn bộ bản xuất: nhịp, liên tục, chữ, âm và gameplay trung thực.

Sửa đúng cảnh/lớp, so cùng đoạn trước/sau.

Báo đường dẫn sản phẩm, phần đã kiểm tra và giới hạn.

Chỉ công bố theo đích/quyền đã cung cấp; preview cục bộ là mốc đầu hữu ích.
