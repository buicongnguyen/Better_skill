---
name: signal-garden-round-review
description: Kiểm tra hồi quy trạng thái vòng chơi Signal Garden sau khi sửa kích hoạt đèn, sát thương, thời gian, tạm dừng hoặc chơi lại.
---

# Rà soát vòng chơi Signal Garden

Ví dụ tùy chọn: chỉ cài sau khi tài liệu game được tham chiếu đã tồn tại và các phép kiểm tra đem thêm giá trị so với công cụ rà soát sẵn có. Đây không phải skill phát triển game chung.

Lấy docs/acceptance.md làm nguồn chính cho luật và lệnh kiểm tra hiện tại. Các trường hợp dưới mô tả thiết kế ban đầu của sách; cập nhật khi thiết kế đổi.

Các tình huống biên liên quan:
- Hết giờ hoặc máu về không trong cùng bước mô phỏng kích hoạt đèn thì thua được ưu tiên.
- Kích hoạt cần lần nhấn E mới, trong hai đơn vị, sau khi thu đủ ba pin.
- Drone gây mất một máu; thời gian miễn sát thương là một giây.
- Tạm dừng đóng băng giờ và mô phỏng. Mất tiêu điểm xóa phím giữ và dừng lượt đang chạy; quay lại cần bấm Tiếp tục.
- Chơi lại từ paused, won hoặc lost đặt lại pin, máu, giờ, vị trí robot, tiến độ drone, hồi chiêu, hiệu ứng, phím giữ rồi vào playing cho lượt mới.

Chọn trường hợp bị thay đổi ảnh hưởng. Dùng phép kiểm tra xác định cho biên thời gian và điều khiển người chơi thật cho hành trình liên quan nếu có trình duyệt. Hàm chuẩn bị cảnh không chứng minh điều khiển hoạt động.

Đầu ra: commit, trường hợp, bước tái hiện, mong đợi/thực tế và bằng chứng. Ghi rõ phần không chạy được. Sửa lỗi trong phạm vi và kiểm tra lại phần ảnh hưởng; kết thúc khi các kiểm tra đó đạt. Cập nhật docs/progress.md nếu hoàn thành mốc.
