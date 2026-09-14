# Thiết kế prompt thực thi cho GPT-6 Astra

Bạn biên tập thiết kế game và quy trình lập trình.

Tạo prompt thực thi thực dụng cho GPT-6 Astra trong tác nhân lập trình.

Nhiệm vụ của cuộc trò chuyện này là thiết kế prompt, không triển khai game.

MÔ TẢ ĐẦU VÀO
Dùng mô tả dưới hoặc docs/game-brief.md đính kèm. Thiếu chi tiết thì dùng mặc định Signal Garden và ghi là giả định:
- Người chơi: robot bảo trì khôi phục đèn hiệu mái nhà.
- Vòng chơi: nhặt ba pin, tránh một drone tuần tra, quay về và kích hoạt đèn.
- Phạm vi: một đấu trường phẳng, trình duyệt máy tính, bàn phím, vòng chơi có thắng, thua, tạm dừng và chơi lại.
- Công nghệ ưu tiên: TypeScript, Vite, Three.js; GitHub Pages sau khi đích công bố được cho phép rõ ràng.
- Hình ảnh: tài nguyên hình học nguyên bản, đá xanh dịu, pin hổ phách, đèn xanh ngọc. Ưu tiên dáng vật thể và camera dễ hiểu.
- Ràng buộc: không backend, tài khoản, nhiều người chơi, API trả phí hoặc tài nguyên thiếu phép. Giữ bản đầu nhỏ.

Thay đổi riêng, tệp hiện có, ảnh tham khảo, công cụ đã cài, phần cứng mục tiêu và ngân sách của tôi:
[Điền ở đây hoặc giữ mặc định và ghi điều chưa biết.]

QUY TRÌNH
1.
   Phân biệt yêu cầu bắt buộc, sở thích, giả định và điều chưa biết thực sự chặn việc.
   Hỏi tối đa ba câu tập trung chỉ khi đoán sai làm thay đổi kết quả đáng kể.
   Tiếp tục phần soạn prompt độc lập nếu có thể.
2.
   Chỉ so cách làm có thể thay đổi quyết định cho mô tả này: prototype một lượt, đặc tả trước, theo tutorial, làm tăng dần, chơi thử hình ảnh, chuyên gia song song.
   Giải thích đánh đổi ngắn; không bịa benchmark hay cam kết thời gian.
3.
   Đề xuất tổ hợp tối thiểu và công nghệ công cụ thực sự thao tác được.
   Giữ engine người dùng đã chọn rõ.
   Tra tài liệu gốc trước nhận định nhạy phiên bản; báo nếu không duyệt web được.
4.
   Soạn prompt gồm trải nghiệm, điều khiển, camera, luật thế giới, biên, tài nguyên, kiểm tra và điều kiện xong.
   Nếu đã có trong tài liệu chính xác, tham chiếu thay vì chép lại.
   Dùng mốc theo kết quả, không ép lộ trình mọi lần sửa.
   Ưu tiên skill có sẵn; chỉ đề xuất skill mới cho khoảng trống lặp lại cụ thể.
5.
   Yêu cầu xem tệp trước khi sửa, giữ công việc người dùng, quyết định thông thường hợp lý và tiếp tục qua phạm vi đã được phép.
   Công bố bên ngoài là ranh giới quyền riêng trừ khi đã được cho phép.
6.
   Chỉ yêu cầu bằng chứng có ích: logic tập trung, tương tác bằng điều khiển thật, xem hình và người chơi thử khi cần đánh giá.
   Không coi build đạt là chứng minh game hoạt động.
7. Rà soát mâu thuẫn, yêu cầu không có phép thử, phạm vi thêm ngầm, công cụ không có và tính từ mơ hồ. Sửa một lượt để xử lý đúng các vấn đề đó.

TRẢ VỀ
A. Giả định và câu hỏi chặn việc nếu có.
B. So sánh và khuyến nghị ngắn.
C. Prompt thực thi cuối có thể sao chép, đánh dấu trường chưa giải quyết.
D. Danh sách nghiệm thu ngắn và kế hoạch chơi thử đầu.
E. Giải thích ngắn lỗi đã sửa trong lượt rà soát.

Prompt cuối phải đủ dùng cho thư mục trống hoặc nêu rõ phụ thuộc tài liệu đã có.

Dùng chỉ dẫn trực tiếp và hành vi cụ thể.

Không đổi GPT-6 Astra sang mô hình khác, không yêu cầu chuỗi suy luận riêng tư, không coi điểm tự chấm là bằng chứng chất lượng game.

Trả prompt cuối với khối tham số chỉnh sửa ở đầu, rồi mục tiêu, nhóm công việc/ràng buộc và điều kiện hoàn thành quan sát được.

Liệt kê engine/công cụ thay thế dưới dạng lựa chọn, chọn một, và để hướng dẫn chi tiết phụ thuộc lựa chọn đó.

Tách giá trị tinh chỉnh khỏi yêu cầu; kiểm tra rằng đổi tham số không để lại giá trị cố định xung đột trong phần thân.
